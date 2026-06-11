import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID={
    'seeker_free':'price_1Th5PgFMvSyBgzyM9UUn46u5',
    'seeker_pro':'price_1Th5t9FMvSyBgzyMJE1aLOf0',
    'seeker_premium':'price_1Th5u0FMvSyBgzyM9keGAP3B',
    'recruiter_enterprise':'price_1Th65DFMvSyBgzyMpspdd1wj',
    'recruiter_growth':'price_1Th64gFMvSyBgzyM2JrRa3nY',
    'recruiter_free':'price_1Th64gFMvSyBgzyM2JrRa3nY',
}