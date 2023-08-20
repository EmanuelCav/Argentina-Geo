
import User from '../components/home/user'
import Options from '../components/home/options'
import Container from '../Container'

import { StackNavigation } from '../types/props.types'

const Home = ({ navigation }: { navigation: StackNavigation }) => {
    return (
        <Container>
            <User />
            <Options navigation={navigation} />
        </Container>
    )
}

export default Home