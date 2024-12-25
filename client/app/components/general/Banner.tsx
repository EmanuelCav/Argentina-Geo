import { View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { BANNER_PLAY_ID } from "@env";

import { generalStyles } from '../../styles/general.styles'

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : `${BANNER_PLAY_ID}`;

const Banner = () => {
    return (
        <View style={generalStyles.containerBanner}>
            <BannerAd
                unitId={adUnitId as string}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
        </View>
    )
}

export default Banner