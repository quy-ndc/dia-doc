// FOR COLOR THAT CANNOT BE APPLIED TO STYLESHEET
type ColorValue = {
    name: string
    value: string
}

export enum GlobalColor {
    TAB_BAR_ACTIVE_BG_LIGHT = 'tab-bar-active-bg-light',
    TAB_BAR_ACTIVE_BG_DARK = 'tab-bar-active-bg-dark',
    LIKE_BUTTON_FILL_LIGHT = 'like-button-fill-light',
    LIKE_BUTTON_FILL_DARK = 'like-button-fill-dark',
}

const Colors: ColorValue[] = [
    { name: GlobalColor.TAB_BAR_ACTIVE_BG_LIGHT, value: 'rgba(189, 189, 189, 0.3)' },
    { name: GlobalColor.TAB_BAR_ACTIVE_BG_DARK, value: 'rgba(100, 100, 100, 0.2)' },
    { name: GlobalColor.LIKE_BUTTON_FILL_LIGHT, value: 'blue' },
    { name: GlobalColor.LIKE_BUTTON_FILL_DARK, value: 'rgb(71, 71, 195)' }
]

export const GetGlobalColor = (name: string) => {
    return Colors.find(item => item.name === name);
}