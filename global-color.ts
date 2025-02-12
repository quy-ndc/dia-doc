// FOR COLOR THAT CANNOT BE APPLIED TO STYLESHEET
type ColorValue = {
    name: string
    value: string
}

export enum GlobalColor {
    TAB_BAR_ACTIVE_BG_LIGHT = 'tab-bar-active-bg-light',
    TAB_BAR_ACTIVE_BG_DARK = 'tab-bar-active-bg-dark'
}

const Colors: ColorValue[] = [
    { name: GlobalColor.TAB_BAR_ACTIVE_BG_LIGHT, value: 'rgba(189, 189, 189, 0.2)' },
    { name: GlobalColor.TAB_BAR_ACTIVE_BG_DARK, value: 'rgba(100, 100, 100, 0.2)' },
]

export const GetGlobalColor = (name: string) => {
    return Colors.find(item => item.name === name);
}