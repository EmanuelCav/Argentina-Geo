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

        return res.status(200).json({ message: "New question" })

    } catch (error) {
        throw error
    }

}

export const correctQuestion = async (req: Request, res: Response) => {

    const { id, gameId } = req.params

    try {

        const category = await Categoryuser.findById(id)
        const game = await Game.findById(gameId)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (!game) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (req.user != category.user) {
            return res.status(400).json({ message: "The category user does not match with user logged" })
        }

        if (req.user != game.user) {
            return res.status(400).json({ message: "The game user does not match with user logged" })
        }

        await Categoryuser.findByIdAndUpdate(id, {
            corrects: category.corrects + 1
        }, {
            new: true
        })

        const gameUpdated = await Game.findByIdAndUpdate(gameId, {
            corrects: game.corrects + 1
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

        // let options = ["Aconcagua", "Monte Pissis", "Cerro Bonete Chico", "Cerro Catedral", "Cerro de los Siete Colores", "Cerro Torre", "Chañi", "Cerro Tronador", "Champaquí", "Volcán Lanín"]

        // let options = ["Mendoza", "Río Negro", "Tucumán", "Neuquén", "Buenos Aires", "La Rioja", "La Pampa", "Corrientes", "Entre Ríos", "Catamarca", "Salta", "San Juan", "Córdoba", "Tierra del Fuego, Antártida e Islas del Atlántico Sur", "Jujuy", "Santa Cruz", "Chubut", "Chaco", "Santiago del Estero", "Santa Fe", "Misiones", "San Luis", "Formosa", "Ciudad Autónoma de Buenos Aires"]
        // let options = ["Río Paraná", "Río Cuarto", "Río Uruguay", "Río Atuel", "Río de la Plata", "Río Bermejo", "Río Colorado", "Río Salado", "Río Paraguay", "Río Negro"]
        // let options = ["Lago Argentino", "Lago Nahuel Huapi", "Lago Viedma", "Lago Lácar", "Lago Musters", "Lago Cardiel", "Lago Epecuén", "Lago Pellegrini", "Lago Buenos Aires", "Lago Aluminé"]
        // let options = ["5", "7", "2", "6", "4", "8", "10", "3", "1", "9"]
        // let options = ["80", "140", "50", "110", "120", "90", "100", "70", "60", "130"]
        // let options = ["Glaciar Perito Moreno", "Glaciar Grey", "Monte Fitz Roy", "Glaciar Spegazzini", "Cerro Torre", "Mundo Marino", "Glaciar Seco", "Glaciar Onelli", "Cerro Tres Picos", "Monte Shipton"]
        // let options = ["Mar del Plata", "Necochea", "Las Grutas", "Punta Alta", "Vila Gesell", "Puerto Madryn", "Pinamar", "Comodoro Rivadavia", "Miramar", "Caleta Olivia", "Río Grande"]
        // let options = ["Península Valdés", "Península Mitre", "Península San Antonio", "Bahía de Samborombón", "Península de Magallanes", "Península Viedma", "Bahía Grande", "Bahía San Antonio", "Bahía Blanca", "Península El Páramo"]
        // let options = ["Cerro de los Siete Colores", "Cerro Tronador", "Cerro Zapaleri", "Cerro Torre", "Cerro Bonete Chico", "Cerro Aracar", "Cerro Tupungato", "Cerro Luracatao", "Cerro Malcante", "Cerro de las Ovejas"]
        // let options = ["6.961", "5.439", "7.104", "6.320", "7.467", "6.103", "5.888", "6.541", "4.865", "4.412"]
        // let options = ["Obelisco", "Monumento a la Bandera", "Floralis Generica", "Plaza General San Martín", "Basílica de Luján", "Casa Histórica de la Independencia", "Palacio San José", "Teatro Colón", "Puente de la Mujer", "Cristo de las Sierras"]
        let options = ["Bandera", "", "", "", "", "", "", "", "", ""]

        // let options = ["Alejandro Sabella", "Diego Armando Maradona", "Gerardo Martino", "Marcelo Bielsa", "Jorge Sampaoli", "Daniel Passarella", "Sergio Batista", "Alfio Basile", "Omar Sívori", "José Néstor Pekerman"]
        // let options = ["Paula Pareto", "Marcela Acuña", "Cecilia Carranza Saroli", "Georgina Bardach", "Gabriela Sabatini", "Luciana Aymar", "Paola Sanchez", "Noemí Sarmiento", "Jeanette Campbell", "Cecilia Rognoni"]
        // let options = ["La Academia", "El Canalla", "El Globo", "El Granate", "El Viaducto", "El Millinario", "El Funebrero", "La Lepra", "El Ciclón", "El Pirata"]
        // let options = ["El Fideo", "La Pulga", "Pipita", "El Huevo", "Papu", "Pelusa", "El Toro", "La Araña", "El Dibu", "Carucha"]
        // let options = ["Colón", "Newell's Old Boys", "Argentinos Juniors", "Lanús", "Gimnasia La Plata", "Belgrano", "Rosario Central", "Platense", "Atlanta", "Gimnasia de Jujuy"]
        // let options = ["Pascual Pérez", "Carlos Monzón", "Sergio Martinez", "Brian Castaño", "José María Gatica", "Nicolino Locche", "Omar Narváez", "Luis Ángel Firpo", "Victor Zalazar", "Marcos Maidana"]
        // let options = ["La Tigresa", "La Leona", "La Garra", "La Pantera", "La Puma", "La Tiburona", "La Locomotora", "La Chita", "La Jirafa", "La Merluza"]
        // let options = ["1978", "1986", "1982", "2002", "2010", "1962", "1966", "1930", "1938", "1954"]
        // let options = ["Guillermo Vilas", "David Nalbandian", "Juan Martín del Potro", "Gastón Gaudio", "Guillermo Coria", "José Luis Clerc", "Juan Mónaco", "Guillermo Pérez Roldan", "Martín Jaite", "Diego Schwartzman"]
        // let options = ["Mario Alberto Kempes", "Daniel Passarella", "Ricardo Bochini", "Jorge Burruchaga", "Diego Armando Maradona", "José Luis Brown", "Américo Gallego", "Gabriel Batistuta", "Jorge Valdano", "René Houseman"]
        // let options = ["Lionel Messi", "Gabriel Batistuta", "Diego Armando Maradona", "Javier Zanetti", "Juan Sebastián Verón", "Sergio Agüero", "Carlos Tévez", "Mario Alberto Kempes", "Jorge Valdano", "Ariel Ortega"]
        // let options = ["Taekwondo", "Boxeo", "Esgrima", "Natación", "Atletismo", "Ciclismo", "Tiro con arco", "Tenis de mesa", "Badminton", "Judo"]
        // let options = ["Juan Manuel Fangio", "Delfo Cabrera", "Juan Cucuchet", "Roberto De Vicenzo", "Luis Scola", "Felipe Contepomi", "Alberto Demiddi", "Carlos Reutemann", "Hugo Porta", "Hugo Conte"]
        // let options = ["Gigante de Arroyito", "Marcelo Bielsa", "Brigadier General Estanislao López", "Presidente Perón", "Florencio Sola", "Norberto Tomaghello", "15 de Abril", "José Amalfitani", "Arquitecto Ricardo Etcheverri", "Ciudad de Vicente López"]
        // let options = ["Ninguno", "2", "1", "3", "4", "5", "6", "7", "8", "9"]
        // let options = ["Rosario", "Córdoba", "Mendoza", "Mar del Plata", "La Plata", "Bahía Blanca", "Gualeguaychú", "Corrientes", "Comodoro Rivadavia", "Resistencia"]
        // let options = ["La Bombonera", "El Monumental", "El Cilindro de Avellaneda", "El Nuevo Gasómetro", "La Fortaleza", "El Fortín", "Cementerio de los Elefantes", "Estadio del Bosque", "El Coloso del Parque", "El Globo"]

        // let options = ["Soda Stereo", "Divididos", "Tan Biónica", "Las Pelotas", "Los Abuelos de la Nada", "Virus", "Serú Girán", "Babasónicos", "Pescado Rabioso", "Almendra", "Los Auténticos Decadentes", "Los Twist", "Los Piojos", "La Renga", "Hermética", "Los Gatos", "Los Fabulosos Cadillacs", "Patricio Rey y Sus Redonditos de Ricota", "Pappo's Blues", "Los Pericos", "Callejeros", "Los Beatniks", "Rata Blanca", "Almafuerte", "Ratones Paranoicos", "Riff", "V8", "O'Connor", "La Bersuit", "Attaque 77", "Intoxicados", "Sui Generis", "Sumo", "Enanitos Verdes", "Ciro y Los Persas", "Catupecu Machu"]
        // let options = ["Andrés Calamaro", "Vicentico", "Palito Ortega", "Fito Páez", "Diego Torres", "Pappo", "Patricia Sosa", "Luciano Pereyra", "Mercedes Sosa", "Fabiana Cantilo", "Gilda", "Valeria Lynch", "Sandra Mihanovich", "Soledad Pastorutti", "Tita Merello", "Dread Mar-I", "Alejandro Lerner", "Axel", "Abel Pintos", "Ulises Bueno", "Osvaldo Frascino", "Litto Nebbia", "Adrián Barilari", "Daniel Agostini", "Federico Moura", "Miguel Abuelo", "Gustavo Cerati", "Luis Alberto Spinetta", "Andrés Ciro Martínez", "Charly García", "León Gieco", "Sandro", "Ricardo Iorio", "Indio Solari", "Walter Olmos", "Rodrigo Bueno"]
        // let options = ["Tango", "Música clásica", "Salsa", "Jazz", "Folklore", "Country", "Pop", "Rock", "Reggae", "Cuarteto", "Reggaetón"]
        // let options = ["Astor Piazzolla", "Alberto Marino", "Enrique Santos Discépolo", "Tita Merello", "Carlos Gardel", "Horacio Salgan", "Ada Falcón", "Osvaldo Pugliese", "Eduardo Arolas", "Dino Saluzzi", "Roberto Goyeneche", "Edmundo Rivero", "Mercedes Sosa", "Julio Sosa"]
        // let options = ["Guitarra", "Tambor", "Violín", "Saxofón", "Gaita", "Piano", "Flauta", "Trompeta", "Bandoneón", "Ukelele", "Dejembe"]
        // let options = ["1991", "1986", "1979", "1983", "1994", "1974", "1988", "1993", "1997", "1998"]
        // let options = ["Paulo Londra", "Duki", "Lit Killah", "Khea", "Maria Becerra", "Tini", "Trueno", "Thiago PZK", "Rusherking", "Nicki Nicole", "Luck Ra", "Cazzu", "Milo J", "Neo Pistea", "Emilia Mernes", "Wos"]
        // let options = ["Alfonsina y el mar", "Todo cambia", "Como la cigarra", "La Maza", "Gracias a la vida", "Ojos de cielo", "Zona de promesas", "Solo le pido a Dios", "Zamba para olvidarte", "Razón de vivir"]

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
        // let options = ["Ricardo Rojas", "Julio Cortázar", "Ricardo Piglia", "Juan Gelman", "Tomás Eloy Martínez", "Abelardo Castillo", "Haroldo Conti", "Olga Orozco", "Carlos Guido", "Leopoldo Marechal", "Marco Denevi", "José Hernández", "Osvaldo Soriano", "Liliana Bodoc", "Juan José Saer", "Alejandra Pizarnik", "Alfonsna Storni", "Leila Guerriero", "Ernesto Sábato", "Leopoldo Lugones", "Roberto Arlt", "Leónidas Barletta", "Macedonio Fernández", "Manuel Galvez", "Héctor Germán Oesterheld", "Gregorio Weinber", "Esteban Echeverría", "Antonio Di Benedetto", "Manuel Puig", "Rodolfo Walsh", "Hebe Uhart", "Adolfo Bioy Casares", "Hector Tizón", "Ana María Shua", "Ricardo Guiraldes", "Maria Elena Walsh", "Jorge Luis Borges"]
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
        // let options = ["Asado", "Arroz", "Hamburguesa", "Taco", "Burrito", "Ceviche", "Pachamanca", "Pabellón", "Arepas", "Cazuela"]

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