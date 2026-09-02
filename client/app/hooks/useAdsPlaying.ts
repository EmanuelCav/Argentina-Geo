import { useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'
import {
    InterstitialAd,
    RewardedAd,
    AdEventType,
    RewardedAdEventType,
    TestIds,
} from 'react-native-google-mobile-ads'
import { INTERSTITIAL_FINISH_ID, RECOMPENSADO_ID } from '@env'

const interstitialId = __DEV__ ? TestIds.INTERSTITIAL : INTERSTITIAL_FINISH_ID
const rewardedId = __DEV__ ? TestIds.REWARDED : RECOMPENSADO_ID

const interstitial = InterstitialAd.createForAdRequest(interstitialId)
const rewarded = RewardedAd.createForAdRequest(rewardedId)

export const useAdsPlaying = () => {

    const [isIntersitialLoaded, setIsInterstitialLoaded] = useState<boolean>(false)
    const [isRewardedLoaded, setIsRewardedLoaded] = useState<boolean>(false)

    useEffect(() => {

        interstitial.load()

        const unsubLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => setIsInterstitialLoaded(true)
        )

        const unsubOpened = interstitial.addAdEventListener(
            AdEventType.OPENED,
            () => {
                if (Platform.OS === 'ios') {
                    StatusBar.setHidden(true)
                }
            }
        )

        const unsubClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                if (Platform.OS === 'ios') {
                    StatusBar.setHidden(false)
                }
                setIsInterstitialLoaded(false)
                interstitial.load()
            }
        )

        return () => {
            unsubLoaded()
            unsubOpened()
            unsubClosed()
        }
    }, [])

    useEffect(() => {

        rewarded.load()

        const unsubLoaded = rewarded.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => setIsRewardedLoaded(true)
        )

        const unsubReward = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            () => setIsRewardedLoaded(false)
        )

        return () => {
            unsubLoaded()
            unsubReward()
        }
    }, [])

    return {
        interstitial,
        rewarded,
        isIntersitialLoaded,
        isRewardedLoaded
    }
}