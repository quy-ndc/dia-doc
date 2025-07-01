export enum HealthCarePlanPeriod {
    BEFORE_BREAKFAST = 'before_breakfast',
    AFTER_BREAKFAST = 'after_breakfast',
    BEFORE_LUNCH = 'before_lunch',
    AFTER_LUNCH = 'after_lunch',
    BEFORE_DINNER = 'before_dinner',
    AFTER_DINNER = 'after_dinner',
    BEFORE_SLEEP = 'before_sleep',
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    EVENING = 'evening',
}

export enum HealthCarePlanSubType {
    // Blood Glucose
    FASTING = 'fasting',
    POST_PARANDIAL = 'postprandial',

    // Blood Pressure
    RESTING = 'resting',
    SITTING = 'sitting',
    STANDING = 'standing',
}