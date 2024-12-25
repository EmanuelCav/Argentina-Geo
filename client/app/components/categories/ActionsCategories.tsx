import { View } from 'react-native'

import ActionCategory from './components/ActionCategory'

import { categoriesStyles } from '../../styles/categories.styles'

const ActionsCategories = ({ handleAction }: { handleAction: (action: string) => void }) => {
    return (
        <View style={categoriesStyles.containerActionsCategories}>
            <ActionCategory text='Elegir todo' handleAction={handleAction} action='select' />
            <ActionCategory text='Quitar todo' handleAction={handleAction} action='quit' />
        </View>
    )
}

export default ActionsCategories