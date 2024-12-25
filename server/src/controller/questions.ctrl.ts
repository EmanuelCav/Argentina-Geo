import { Request, Response } from "express";
import fs from 'fs-extra';

import Question from '../database/models/question';
import Category from '../database/models/category';
import Categoryuser from '../database/models/categoryUser'
import Image from '../database/models/image';
import Game from '../database/models/game'

import { cloud } from "../helper/cloud";

import { folder } from "../config/config";

export const questions = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showQuestions = await Question.find()

        return res.status(200).json(showQuestions)

    } catch (error) {
        throw error
    }

}

export const questionsCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const showQuestions = await Question.find({
            category: id
        })

        return res.status(200).json({
            questions: showQuestions,
            amount: showQuestions.length
        })

    } catch (error) {
        throw error
    }

}


export const createQuestions = async (req: Request, res: Response): Promise<Response> => {

    const { question, category, answer } = req.body

    try {

        const categorySelected = await Category.findOne({ name: category })

        if (!categorySelected) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        let questionSaved;

        if (req.file) {

            const result = await cloud.uploader.upload(req.file.path, {
                use_filename: true,
                folder: `${folder}`
            })

            const newImage = new Image({
                image: result.secure_url,
                imageId: result.public_id
            })

            const imageSaved = await newImage.save()

            const newQuestion = new Question({
                question,
                image: imageSaved._id,
                category: categorySelected._id,
                answer
            })

            questionSaved = await newQuestion.save()

            await fs.unlink(req.file.path)

        } else {

            const newQuestion = new Question({
                question,
                category: categorySelected._id,
                answer
            })

            questionSaved = await newQuestion.save()

        }

        return res.status(200).json({
            message: "Question craeted successfully",
            question: questionSaved
        })

    } catch (error) {
        throw error
    }

}

export const removeQuestions = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const question = await Question.findByIdAndDelete(id).populate("image")

        if (!question) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        // if (question.image) {
        //     await cloud.uploader.destroy(question.image.imageId)
        // }

        await Question.findByIdAndDelete(id)

        return res.status(200).json({ message: "Question was removed successfully" })

    } catch (error) {
        throw error
    }

}

export const gameQuestion = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const category = await Categoryuser.findById(id)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (req.user != category.user) {
            return res.status(400).json({ message: "The category user does not match with user logged" })
        }

        await Categoryuser.findByIdAndUpdate(id, {
            questions: category.questions + 1
        }, {
            new: true
        })

        return res.status(200).json({ message: "Question counted" })

    } catch (error) {
        throw error
    }

}

export const correctQuestion = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const category = await Categoryuser.findById(id)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (req.user != category.user) {
            return res.status(400).json({ message: "The category user does not match with user logged" })
        }

        await Categoryuser.findByIdAndUpdate(id, {
            corrects: category.corrects + 1
        }, {
            new: true
        })

        return res.status(200).json({
            message: "User category updated"
        })

    } catch (error) {
        throw error
    }

}

export const generateQuestion = async (req: Request, res: Response): Promise<Response> => {

    const { id, questionId } = req.params

    try {

        const game = await Game.findById(id)

        if (!game) {
            return res.status(400).json({ message: "Game does not exists" })
        }

        const question = await Question.findById(questionId)

        if (!question) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        const gameUpdated = await Game.findByIdAndUpdate(id, {
            $push: {
                questions: question._id
            }
        }, {
            new: true
        })
            .populate({
                path: "questions",
                populate: [{
                    path: "image",
                    select: "image"
                }, {
                    path: "category"
                }]
            })

        return res.status(200).json(gameUpdated)

    } catch (error) {
        throw error
    }

}

export const generateOption = async (req: Request, res: Response): Promise<Response> => {

    const { option } = req.body
    const { id } = req.params

    try {

        // await Question.findByIdAndUpdate(id, {
        //     $push: {
        //         options: option
        //     }
        // }, {
        //     new: true
        // })

        const question = await Question.findById(id)

        if (!question) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        // let options = ["Jujuy", "Tucumán", "San Juan", "Mendoza", "Misiones", "Buenos Aires", "Santa Fe", "Río Negro", "Neuquén", "La Rioja", "La Pampa", "Corrientes", "Entre Ríos", "Catamarca", "Salta", "Córdoba", "Tierra del Fuego, Antártida e Islas del Atlántico Sur", "Santa Cruz", "Chubut", "Chaco", "Santiago del Estero", "San Luis", "Formosa"]
        // let options = ["La Plata", "Mar del Plata", "Goya", "Rosario", "Córdoba", "Bahía Blanca", "Paraná", "Resistencia", "Santa Fe", "Rafaela", "Venado Tuerto", "Mendoza", "Corrientes", "Santiago del Estero", "Gualeguaychú", "Puerto Madryn", "Rawson", "San Juan", "Salta", "Guaymallén", "Santa Rosa", "Concordia", "Villa Mercedes", "San Francisco"]
        // let options = ["23", "17", "19", "21", "25", "27", "20", "26", "15", "22"]
        // let options = ["Río Paraná", "Río Cuarto", "Río Uruguay", "Río Atuel", "Río de la Plata", "Río Bermejo", "Río Colorado", "Río Salado", "Río Paraguay", "Río Negro"]
        // let options = ["Lago Argentino", "Lago Nahuel Huapi", "Lago Viedma", "Lago Lácar", "Lago Musters", "Lago Cardiel", "Lago Epecuén", "Lago Pellegrini", "Lago Buenos Aires", "Lago Aluminé"]
        // let options = ["5", "7", "2", "6", "4", "8", "10", "3", "1", "9"]
        // let options = ["80", "140", "50", "110", "120", "90", "100", "70", "60", "130"]
        // let options = ["Glaciar Perito Moreno", "Glaciar Grey", "Monte Fitz Roy", "Glaciar Spegazzini", "Cerro Torre", "Mundo Marino", "Glaciar Seco", "Glaciar Onelli", "Cerro Tres Picos", "Monte Shipton"]
        // let options = ["Mar del Plata", "Necochea", "Las Grutas", "Punta Alta", "Vila Gesell", "Puerto Madryn", "Pinamar", "Comodoro Rivadavia", "Miramar", "Caleta Olivia", "Río Grande"]
        // let options = ["Península Valdés", "Península Mitre", "Península San Antonio", "Bahía de Samborombón", "Península de Magallanes", "Península Viedma", "Bahía Grande", "Bahía San Antonio", "Bahía Blanca", "Península El Páramo"]
        let options = ["Nevado Ojos del Salado", "Chañi", "Aconcagua", "Cerro Tronador", "Cerro Bonete Chico", "Llullaillaco", "Champaquí", "Volcán Lanín", "Volcán Domuyo", "Cerro Aracar", "Monte Pissis", "Volcán Maipo"]
        // let options = ["6.961", "5.439", "7.104", "6.320", "7.467", "6.103", "5.888", "6.541", "4.865", "4.412"]
        // let options = ["Obelisco", "Monumento a la Bandera", "Floralis Generica", "Plaza General San Martín", "Basílica de Luján", "Casa Histórica de la Independencia", "Palacio San José", "Teatro Colón", "Puente de la Mujer", "Cristo de las Sierras"]
        // let options = ["Avenida 9 de Julio", "Avenida de Mayo", "Avenida Santa Fe", "Avenida Rivadavia", "Avenida Pueyrredón", "Avenida del Libertador", "Avenida Paseo Colón", "Avenida Corrientes", "Avenida Boedo", "Avenida San Martín"]
        // let options = ["Cosquín", "Córdoba", "Río Cuarto", "Villa Carlos Paz", "Capilla del Monte", "Monte Maíz", "Río Tercero", "Dean Funes", "Villa General Belgrano", "La Calera", "Almafuerte", "Alta Gracia", "Bell Ville"]
        // let options = ["Cuyo", "Patagonia", "Litoral", "Gran Chaco", "Pampas", "Noroeste", "Mesopotamia", "Sierras", "Nordeste", "Yungas", "Espinal"]
        // let options = ["Tehuelche", "Tobas (Qom)", "Comechingón", "Guaraní", "Mapuche", "Huarpe", "Pilagá", "Quechua", "Diaguita", "Tapiete"]

        // let options = ["Conquista del Desierto", "Operación Rosario", "Operación Georgias", "Batalla de San Carlos", "Operación Paraquet", "Revolución Argentina", "Revolución Libertadora", "Proceso de Reorganización Nacional", "Revolución del 43", "Éxodo Jujeño", "Batalla de Caseros"]
        // let options = ["Virreinato del Río de la Plata", "Virreinato de Nueva España", "Virreinato del Perú", "Virreinato de Nueva Granada", "Nueva Francia", "Confederación Perú-Boliviana", "Tierra Firme", "Imperio Inca", "Imperio Azteca", "Imperio Maya"]
        // let options = ["1776", "1910", "1784", "1792", "1763", "1698", "1853", "1810", "1825", "1888"]
        // let options = ["1930 a 1943", "1916 a 1930", "1880 a 1916", "1853 a 1880", "1943 a 1955", "1989 a 1999", "1976 a 1983", "1945 a 1991", "1806 a 1852", "1961 a 1969"]
        // let options = ["Raúl Alfonsín", "Juan Domingo Perón", "Domingo Faustino Sarmiento", "Hipólito Yrigoyen", "Victorino de la Plaza", "Marcelo Torcuato de Alvear", "Fernando de la Rúa", "Néstor Kirchner", "Héctor José Cámpora", "Arturo Umberto Illia", "Arturo Frondizi", "Roberto Marcelino Ortiz", "José María Guido", "Manuel Quintana", "José Figueroa Alcorta", "Nicolás Avellaneda", "Bartolomé Mitre", "Miguel Juárez Celman", "Santiago Derqui", "José Evaristo Uriburu", "Manuel Quintana", "Carlos Saúl Menem", "Fernando de la Rúa"]
        // let options = ["Manuel Belgrano", "José de San Martín", "Juan Manuel de Rosas", "Bartolomé Mitre", "Julio Argentino Roca", "Martín Miguel de Güemes", "Cornelio Saavedra", "Juan José Castelli", "Facundo Quiroga", "Juan Bautista Alberdi", "Domingo Faustino Sarmiento", "Justo José de Urquiza"]
        // let options = ["Juan Bautista Cabral", "Manuel Belgrano", "Cornelio Saavedra", "Juan José Castelli", "Miguel de Azcuénaga", "Manuel Alberti", "Juan José Paso", "Mariano Moreno", "Domingo Matheu", "Juan Larrea"]
        // let options = ["Juan Bautista Alberdi", "Leandro N. Alem", "Hipólito Yrigoyen", "Cornelio Saavedra", "Juan María Gutiérrez", "Bartolomé Mitre", "Bernardo de Irigoyen", "Arturo Frondizi", "Arturo Umberto Illia", "Marcelo Torcuato de Alvear", "Enrique Mosconi", "Juan José Castelli", "Juan Larrea", "Domingo Matheu", "Miguel de Azcuénaga", "Manuel Alberti", "Juan José Paso", "Mariano Moreno", "Bernardino Rivadavia", "Manuel Dorrego", "Facundo Quiroga"]
        // let options = ["6", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

        // let options = ["Albiceleste", "Gladiadores", "Pumas", "Garra", "Celeste", "Albirroja", "Vanguardia", "Tiburones", "Blanca", "Academia"]
        // let options = ["Alejandro Sabella", "Diego Armando Maradona", "Gerardo Martino", "Marcelo Bielsa", "Jorge Sampaoli", "Daniel Passarella", "Sergio Batista", "Alfio Basile", "Omar Sívori", "José Néstor Pekerman"]
        // let options = ["Paula Pareto", "Marcela Acuña", "Cecilia Carranza Saroli", "Georgina Bardach", "Gabriela Sabatini", "Luciana Aymar", "Paola Sanchez", "Noemí Sarmiento", "Jeanette Campbell", "Cecilia Rognoni"]
        // let options = ["La Academia", "El Canalla", "El Globo", "El Granate", "El Viaducto", "El Millinario", "El Funebrero", "La Lepra", "El Ciclón", "El Pirata"]
        // let options = ["El Fideo", "La Pulga", "Pipita", "El Huevo", "Papu", "Pelusa", "El Toro", "La Araña", "El Dibu", "Carucha"]
        // let options = ["Aldosivi", "Alvarado", "Gimnasia de La Plata", "Patronato", "Deportivo Madryn", "Arsenal", "Boca Unidos", "Olimpo", "Talleres", "San Martín de San Juan", "Tigre"]
        // let options = ["Marcelo Bielsa", "Daniel Passarella", "Diego Armando Maradona", "Alejandro Sabella", "José Néstor Pékerman", "Carlos Bianchi", "Américo Gallego", "Jorge Burruchaga", "Alfio Basile", "Sergio Batista"]
        // let options = ["Nicolino Locche", "Sergio Martinez", "Pascual Pérez", "Carlos Monzón", "Brian Castaño", "José María Gatica", "Marcos Maidana", "Omar Narváez", "Luis Ángel Firpo", "Víctor Galíndez", "Oscar Bonavena", "Victor Zalazar", "Horacio Accavallo"]
        // let options = ["La Tigresa", "La Leona", "La Garra", "La Pantera", "La Puma", "La Tiburona", "La Locomotora", "La Chita", "La Jirafa", "La Merluza"]
        // let options = ["1978", "1986", "1982", "2002", "2010", "1962", "1966", "1930", "1938", "1954"]
        // let options = ["Atenas 2004", "Pekín 2008", "Londres 2012", "Río 2016", "Tokio 2020", "Sídney 2000", "Atlanta 1996", "Barcelona 1992", "Los Ángeles 1984", "Seúl 1988"]
        // let options = ["Juan Martín del Potro", "Gastón Gaudio", "Guillermo Coria", "Guillermo Vilas", "David Nalbandian", "José Luis Clerc", "Juan Mónaco", "Guillermo Pérez Roldán", "Martín Jaite", "Diego Schwartzman"]
        // let options = ["Claudio Caniggia", "Mario Alberto Kempes", "Daniel Passarella", "Ricardo Bochini", "Jorge Burruchaga", "Diego Armando Maradona", "José Luis Brown", "Américo Gallego", "Gabriel Batistuta", "Jorge Valdano", "René Houseman", "Ariel Ortega", "Diego Simeone", "Javier Zanetti", "Hernán Crespo"]
        // let options = ["Carlos Tévez", "Lionel Messi", "Gabriel Batistuta", "Roberto Ayala", "Javier Zanetti", "Juan Sebastián Verón", "Sergio Agüero", "Pablo Aimar", "Claudio López", "Ariel Ortega", "Matías Almeyda", "Walter Samuel", "Hernán Crespo", "Marcelo Gallardo", "Juan Pablo Sorín", "Esteban Cambiasso", "Javier Saviola"]
        // let options = ["Básquet", "Tenis", "Fútbol", "Hockey", "Voleibol", "Handball", "Rugby", "Softbol", "Polo", "Waterpolo", "Vela", "Tenis de mesa", "Equitación", "Esgrima", "Natación", "Judo", "Boxeo"]
        // let options = ["Juan Manuel Fangio", "Delfo Cabrera", "Juan Cucuchet", "Roberto De Vicenzo", "Luis Scola", "Felipe Contepomi", "Alberto Demiddi", "Carlos Reutemann", "Hugo Porta", "Hugo Conte"]
        // let options = ["Gigante de Arroyito", "Marcelo Bielsa", "Brigadier General Estanislao López", "Presidente Perón", "Florencio Sola", "Norberto Tomaghello", "15 de Abril", "José Amalfitani", "Arquitecto Ricardo Etcheverri", "Ciudad de Vicente López"]
        // let options = ["8", "3", "5", "6", "7", "9", "11", "12", "10", "13"]
        // let options = ["Rosario", "Córdoba", "Mendoza", "Mar del Plata", "La Plata", "Bahía Blanca", "Gualeguaychú", "Corrientes", "Comodoro Rivadavia", "Resistencia"]
        // let options = ["La Bombonera", "El Monumental", "El Cilindro de Avellaneda", "El Nuevo Gasómetro", "La Fortaleza", "El Fortín", "Cementerio de los Elefantes", "Estadio del Bosque", "El Coloso del Parque", "El Globo"]

        // let options = ["Los Abuelos de la Nada", "La Renga", "Virus", "Divididos", "Los Fabulosos Cadillacs", "Sui Generis", "Almendra", "Soda Stereo", "Tan Biónica", "Las Pelotas", "Serú Girán", "Babasónicos", "Pescado Rabioso", "Los Auténticos Decadentes", "Los Twist", "Los Piojos", "Hermética", "Los Gatos", "Patricio Rey y Sus Redonditos de Ricota", "Pappo's Blues", "Los Pericos", "Callejeros", "Los Beatniks", "Rata Blanca", "Almafuerte", "Ratones Paranoicos", "Riff", "V8", "O'Connor", "La Bersuit", "Attaque 77", "Intoxicados", "Sumo", "Enanitos Verdes", "Ciro y Los Persas", "Catupecu Machu"]
        // let options = ["Valeria Lynch", "León Gieco", "Andrés Calamaro", "Vicentico", "Palito Ortega", "Fito Páez", "Diego Torres", "Pappo", "Patricia Sosa", "Luciano Pereyra", "Mercedes Sosa", "Fabiana Cantilo", "Gilda", "Sandra Mihanovich", "Soledad Pastorutti", "Tita Merello", "Dread Mar-I", "Alejandro Lerner", "Axel", "Abel Pintos", "Ulises Bueno", "Osvaldo Frascino", "Litto Nebbia", "Adrián Barilari", "Daniel Agostini", "Federico Moura", "Miguel Abuelo", "Gustavo Cerati", "Luis Alberto Spinetta", "Andrés Ciro Martínez", "Charly García", "Sandro", "Ricardo Iorio", "Indio Solari", "Walter Olmos", "Rodrigo Bueno"]
        // let options = ["Tango", "Música clásica", "Salsa", "Jazz", "Folklore", "Country", "Pop", "Rock", "Reggae", "Cuarteto", "Reggaetón"]
        // let options = ["Astor Piazzolla", "Alberto Marino", "Enrique Santos Discépolo", "Tita Merello", "Carlos Gardel", "Horacio Salgan", "Ada Falcón", "Osvaldo Pugliese", "Eduardo Arolas", "Dino Saluzzi", "Roberto Goyeneche", "Edmundo Rivero", "Mercedes Sosa", "Julio Sosa"]
        // let options = ["Guitarra", "Tambor", "Violín", "Saxofón", "Gaita", "Piano", "Flauta", "Trompeta", "Bandoneón", "Ukelele", "Dejembe"]
        // let options = ["1991", "1986", "1979", "1983", "1994", "1974", "1988", "1993", "1997", "1998"]
        // let options = ["Paulo Londra", "Duki", "Lit Killah", "Khea", "Maria Becerra", "Tini", "Trueno", "Thiago PZK", "Rusherking", "Nicki Nicole", "Luck Ra", "Cazzu", "Milo J", "Neo Pistea", "Emilia Mernes", "Wos"]
        // let options = ["Alfonsina y el mar", "Todo cambia", "Como la cigarra", "La Maza", "Gracias a la vida", "Ojos de cielo", "Zona de promesas", "Solo le pido a Dios", "Zamba para olvidarte", "Razón de vivir"]
        // let options = ["Tarragó Ros", "Chaqueño Palavecino", "Ramón Ayala", "Turco Cafrune", "Horacio Guarany", "Atahualpa Yupanqui", "Ramona Galarza", "Joselo Schuap", "Mercedes Sosa", "Gilberto Vaca"]

        // let options = ["Museo Nacional de Bellas Artes", "Palacio San José", "Museo de Arqueología de Alta Montaña", "Museo de Ciencias Naturales", "Museo Marítimo y del Presidio", "Planetario Galileo Galilei", "Museo Histórico Nacional", "Museo Casa Rosada", "Museo Mitre", "Museo Moderno"]
        // let options = ["Pintura", "Danza", "Arquitectura", "Literatura", "Cine", "Poesía", "Música", "Cómic", "Fotografía", "Escultura"]
        // let options = ["Ballet", "Chachachá", "Bachata", "Samba", "Salsa", "Vals", "Polka", "Tango", "Bolero", "Merengue"]
        // let options = ["Ceibo", "Margarita", "Dalia", "Tulipán", "Rosa", "Bugambilia", "Lirio", "Orquídea", "Hortensia", "Peonias"]
        // let options = ["Hornero", "Chingolo", "Ñandú común", "Pingüino", "Chimango", "Gaviota Cocinera", "Chajá", "Cóndor andino", "Muitú", "Pato de torrente", "Bailarín azul"]

        // let options = ["2", "Ninguno", "3", "4", "5", "6", "1", "8", "9", "7"]
        // let options = ["Soledad Villamil", "Carla Quevedo", "Cecilia Dopazo", "Guillermo Francella", "Leonardo Sbaraglia", "Pablo Rago", "Luis Brandoni", "Ernesto Alterio", "Juan Carlos Altavista", "Ernesto Alterio", "Juan Diego Botto", "Rodrigo de la Serna", "Juan Minujín", "Alfredo Alcón", "Peter Lanzini", "Alejandra Flechner", "Héctor Alterio", "Hugo Arana", "Norma Alejandro", "Julio Chávez", "Chino Darín", "Facundo Arana", "Antonio Gasalla", "Luis Machín", "Alejandro Awada", "Graciela Borges", "Dolores Fonzi", "Cecilia Roth", "Carla Petersonn", "Julieta Díaz", "Ana María Pichio", "Federico Luppi"]
        // let options = ["Relatos salvajes", "El secreto de sus ojos", "Nueve reinas", "La historia oficial", "Inseparables", "La odisea de los giles", "El aura", "El robo del siglo"]
        // let options = ["Santiago Mitre", "Sergio Renán", "Damián Szifron", "Gaspar Noé", "Juan José Campanella", "Andrés Muschietti", "Fernando Ayala", "Luis Puenzo", "Sebastián Borensztein", "Juan José Jusid", "Ezequiel Acuña", "Lorena Muñoz", "Alejandro Agresti", "Susana Blaustein Muñoz", "Fabián Bielinsky", "Fernando Birri", "Leonardo Favio", "Eliseo Subiela", "Pablo Trapero", "Marcelo Piñeyro", "Diego Lerman", "Hugo del Carril", "Leopoldo Torre Nilsson", "Lucrecia Martel", "Adolfo Aristarain", "María Luisa Bemberg", "Carlos Saura", "Héctor Olivera", "Carlos Hugo Christensen", "Manuel Antín"]
        // let options = ["No Toca Botón", "La Tuerca", "Hiperhumor", "Telecómicos", "Hora de reír", "Gran Cuñado", "Telecataplúm", "Operación Ja-Já"]
        // let options = ["Sos mi vida", "Montecristo", "Valientes", "Los simuladores", "Son amores", "Graduados", "Malparida", "Soy gitano"]
        // let options = ["Gustavo Santaolalla", "Lalo Schifrin", "Jorge Calandrelli", "Héctor Babenco", "Jorge Prelorán", "Norma Aleandro", "Bérénice Bejo", "Pablo Helman"]
        // let options = ["1942", "1957", "1951", "1968", "1913", "1931", "1970", "1966"]
        // let options = ["Comedia", "Aventura", "Fantasía", "Drama", "Ciencia Ficción", "Terror", "Musical", "Suspenso"]
        // let options = ["Tato Bores", "Héctor Alterio", "Antonio Gasalla", "Roberto Moldavsky", "Alberto Olmedo", "Alfredo Alcón", "Federico Luppi", "Carlitos Bala"]
        // let options = ["Violetta", "Floricienta", "Rincón de Luz", "Soy Luna", "Niní", "Casi Ángeles", "Rebelde Way", "Aliados"]
        // let options = ["Mi obra maestra", "El bonaerense", "El hombre de al lado", "El suplente", "Kamchatka", "Re loca", "Doble discurso", "Permitidos"]
        // let options = ["Quirino Cristiani", "Liniers", "Divito", "Luis Sandrini", "Quino", "Antonio Mingote", "Roberto Fontanarrosa", "Manuel García Ferré"]
        // let options = ["Alberto Olmedo", "Tato Bores", "Jorge Porcel", "Javier Portales", "Antonio Gasalla", "Gerardo Sofovich", "Adolfo García Grau", "Juan Carlos Altavista"]

        // let options = ["Un asesinato", "Un incendio", "Una tormenta", "Un accidente aéreo", "Un casamiento", "Una guerra", "Un evento deportivo", "Un recital", "Un terremoto", "Un tsunami"]
        // let options = ["Manuel Puig", "Ricardo Rojas", "Julio Cortázar", "Ricardo Piglia", "Juan Gelman", "Tomás Eloy Martínez", "Abelardo Castillo", "Haroldo Conti", "Olga Orozco", "Carlos Guido", "Leopoldo Marechal", "Marco Denevi", "José Hernández", "Osvaldo Soriano", "Liliana Bodoc", "Juan José Saer", "Alejandra Pizarnik", "Alfonsna Storni", "Leila Guerriero", "Ernesto Sábato", "Leopoldo Lugones", "Roberto Arlt", "Leónidas Barletta", "Macedonio Fernández", "Manuel Galvez", "Héctor Germán Oesterheld", "Gregorio Weinber", "Esteban Echeverría", "Antonio Di Benedetto", "Rodolfo Walsh", "Hebe Uhart", "Adolfo Bioy Casares", "Hector Tizón", "Ana María Shua", "Ricardo Guiraldes", "Maria Elena Walsh", "Jorge Luis Borges"]
        // let options = ["Manuel García Ferré", "Caloi", "Quino", "Dante Quinterno", "Nik", "Roberto Fontanarrosa", "Juan Sasturain", "Liniers", "Landrú", "Divito", "Tute"]
        // let options = ["4", "1", "8", "7", "Ninguno", "10", "5", "2", "9", "6"]
        // let options = ["1871", "1910", "1834", "1850", "1945", "1940", "1814", "1828", "1922", "1931"]
        // let options = ["La invención de Morel", "Ficciones", "El inmortal", "El Aleph", "La biblioteca de Babel", "Labyrinths", "El jardín de senderos que se bifurcan", "La casa de Asterión", "Funes el memorioso", "El otro"]
        // let options = ["Los siete locos", "Plata quemada", "El túnel", "El tiempo de las moscas", "Rayuela", "El beso de la mujer araña", "El Aleph", "La furia", "El enterrado", "Sarmiento"]
        // let options = ["Horacio Oliveira", "Juan Pablo Castel", "María Iribarne", "Camilo Canegato", "Juan Salvo", "Salvador Benesdra", "Philip Marlowe", "David Réguel", "Isabel Fúnes", "Ángel Ergueta"]
        // let options = ["José León Suárez", "Caseros", "Bernal", "Tortuguitas", "San Fernando", "González Catán", "Ezeiza", "Luján", "Pilar", "Zárate"]
        // let options = ["13 de junio", "28 de febrero", "14 de enero", "22 de octubre", "16 de agosto", "4 de noviembre", "20 de diciembre", "6 de julio", "4 de mayo", "22 de mayo"]
        // let options = ["Kalpa imperial", "Historias de cronopios y de famas", "Rayuela", "Casa tomada", "Bestiario", "Los premios", "La señorita Cora", "La noche boca arriba", "Final del juego", "Las armas secretas"]

        // let options = ["Yapeyú", "Gualeguay", "Tandil", "Venado Tuerto", "Quilmes", "Posadas", "Oberá", "La Banda", "Colón", "Clorinda"]
        // let options = ["Operación Rosario", "Operación Georgias", "Batalla de San Carlos", "Operación Paraquet", "Revolución Argentina", "Revolución Libertadora", "Proceso de Reorganización Nacional", "Revolución del 43", "Éxodo Jujeño", "Batalla de Caseros"]
        // let options = ["Batalla de la Vuelta de Obligado", "Batalla de Caseros", "Combate de San Lorenzo", "Batalla de Pavón", "Éxodo Jujeño", "Revolución de Mayo", "Declaración de la Independencia", "Fundación de Buenos Aires", "Creación de la Bandera", "Retorno a la democracía"]
        // let options = ["Martín Miguel de Güemes", "Cornelio Saavedra", "Domingo Faustino Sarmiento", "Bartolomé Mitre", "Julio Argentino Roca", "Juan José Castelli", "Adolfo Alsina", "Manuel Belgrano", "Roque Sáenz Peña", "Nicolás Avellaneda"]
        // let options = ["Mariquita Sánchez de Thompson", "Juana Azurduy", "Eva Perón", "Machacha Güemes", "José María Paz", "Alicia Moreau de Justo", "Manuel Alberti", "Jorge Newbery", "Carlos Saavedra Lamas", "Francisco Laprida"]

        // let options = ["5", "3", "7", "9", "11", "4", "1", "6", "2", "12"]
        // let options = ["Universidad Nacional de Córdoba", "Universidad de Buenos Aires", "Universidad Nacional de La Plata", "Universidad Tecnológica Nacional", "Universidad Nacional del Sur", "Universidad Nacional de Rosario", "Universidad Nacional de Tucumán", "Universidad Nacional del Litoral", "Universidad Nacional de Mar del Plata", "Universidad Nacional de San Luis"]
        // let options = ["Revuelto Gramajo", "Chimichurri", "Humita", "Provoleta", "Fugazzetta rellena", "Tamales", "Locro", "Asado", "Choripán", "Milanesa a la napolitana", "Empanadas"]
        // let options = ["René Favaloro", "Luis Federico Leloir", "Manuel Sadosky", "César Milstein", "Enrique Gaviola", "Bernardo Houssay", "Florentino Ameghino", "Juan Martín Maldacena", "Luis Agote", "Salvador Mazza"]
        // let options = ["Rogel", "Mantecol", "Pionono", "Berlinesa", "Alfajor", "Chocotorta", "Pastafrola", "Churro", "Arrope", "Budín de pan", "Cassata", "Mazamorra", "Imperial ruso", "Achilata", "Garrapiñada", "Bon o Bon", "Bolanchao", "Nucrem"]
        // let options = ["Clericó", "Fernet", "Añapa", "Aloja", "Carrulim", "Chicha", "Cerveza", "Caña", "Muday", "Liso"]
        // let options = ["Teatro Colón", "Teatro San Martín", "Teatro Gran Rex", "Teatro Independencia", "Teatro Ópera Orbis", "Teatro El Nacional", "Teatro Nacional Cervantes", "Teatro Lola Membrives", "Multiteatro Comafi", "Microteatro"]
        // let options = ["Gauchito Gil", "Ángel Gallardo", "Chaqueño Palavecino", "El Colorao Herrera", "Antonio Ríos", "Mercedes Sosa", "Domingo Cura", "Isaco Abitbol", "Hugo Leiva", "Zamba Quipildor"]
        // let options = ["Cataratas del Iguazú", "Glaciar Perito Moreno", "Península Valdés", "Cerro de los Siete Colores", "Quebrada de Cafayate", "Quebrada de Humahuaca", "Salinas Grandes", "Ruinas Quilmes", "Laguna Esmeralda", "Esteros del Iberá"]
        // let options = ["Plata", "Sol", "Tierra", "Metal", "Agua", "Nube", "Estrella", "Paisaje", "Meseta", "Barco"]
        // let options = ["En Unión y Libertad", "Libertad o Muerte", "Paz y Justicia", "Libertad y Orden", "Por la Razón o la Fuerza", "Orden y Progreso", "Dios Unión Libertad", "Más Allá", "La Patria es Primero", "Dios y Federación"]
        // let options = ["Virgen de Luján", "Virgen de Guadalupe", "Virgen del Carmen", "Virgen de los Treinta y Tres", "Virgen de Fátima", "Virgen de Lourdes", "Virgen de las Gracias", "Virgen de Knock", "Virgen de La Salette", "Virgen de Zeitoun"]

        await Question.findByIdAndUpdate(id, {
            $set: {
                options
            }
        }, {
            new: true
        })

        return res.status(200).json({ message: "Option created successfully" })

    } catch (error) {
        throw error
    }

}

export const updateQuestion = async (req: Request, res: Response): Promise<Response> => {

    const { question } = req.body
    const { id } = req.params

    try {

        const questionFound = await Question.findById(id)

        if (!questionFound) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        const questionUpdated = await Question.findByIdAndUpdate(id, {
            question
        }, {
            new: true
        })

        return res.status(200).json(questionUpdated)

    } catch (error) {
        throw error
    }

}

export const questionsSuccess = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showQuestions = await Question.find()

        let wrong = []

        for (let i = 0; i < showQuestions.length; i++) {
            if (showQuestions[i].answer !== showQuestions[i].options[0]) {
                wrong.push(showQuestions[i])
            }
        }

        return res.status(200).json(wrong)

    } catch (error) {
        throw error
    }

}