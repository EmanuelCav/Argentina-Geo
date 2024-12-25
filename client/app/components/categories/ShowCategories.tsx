import { View } from "react-native"

import Category from "./components/Category"

import { ShowCategoriesPropsType } from "../../types/categories.types"

import { categoriesStyles } from "../../styles/categories.styles"

const ShowCategories = ({ categories, changeCategory }: ShowCategoriesPropsType) => {

  return (
    <View style={categoriesStyles.containerShowCategories}>
      {
        categories.map((category) => {
          return <Category changeCategory={changeCategory} category={category} key={category._id} />
        })
      }
    </View>
  )
}

export default ShowCategories