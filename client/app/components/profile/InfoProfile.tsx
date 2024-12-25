import { ScrollView, View } from 'react-native'

import Flag from './components/Flag'
import StatisticsProfile from './components/StatisticsProfile'
import CategoryUser from './components/CategoryUser'

import { ICounterUser } from '../../interface/User'
import { ICategoriesUser } from '../../interface/Game'

const InfoProfile = ({ user }: { user: ICounterUser }) => {
    return (
        <ScrollView style={{ width: '100%' }}>
            <Flag profile={user.profile} />
            <StatisticsProfile user={user} />
            <View style={{ width: '100%' }}>
                {
                    user.profile.categories?.map((category: ICategoriesUser) => {
                        return <CategoryUser category={category} key={category._id} />
                    })
                }
            </View>
        </ScrollView>
    )
}

export default InfoProfile