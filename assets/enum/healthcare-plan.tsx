export enum HealthCarePlanPeriod {
    // BEFORE_BREAKFAST = 'before_breakfast',
    // AFTER_BREAKFAST = 'after_breakfast',
    // BEFORE_LUNCH = 'before_lunch',
    // AFTER_LUNCH = 'after_lunch',
    // BEFORE_DINNER = 'before_dinner',
    // AFTER_DINNER = 'after_dinner',
    // BEFORE_SLEEP = 'before_sleep',
    // MORNING = 'morning',
    // AFTERNOON = 'afternoon',
    // EVENING = 'evening',
    BEFORE_BREAKFAST = 0,
    AFTER_BREAKFAST = 1,
    BEFORE_LUNCH = 2,
    AFTER_LUNCH = 3,
    BEFORE_DINNER = 4,
    AFTER_DINNER = 5,
    BEFORE_SLEEP = 6,
    MORNING = 7,
    AFTERNOON = 8,
    EVENING = 9,
}

export enum HealthCarePlanSubType {
    // Blood Glucose
    // FASTING = 'fasting',
    // POST_PARANDIAL = 'postprandial',
    FASTING = 0,
    POST_PARANDIAL = 1,

    // Blood Pressure
    // RESTING = 'resting',
    // SITTING = 'sitting',
    // STANDING = 'standing',
    RESTING = 2,
    SITTING = 3,
    STANDING = 4,
}