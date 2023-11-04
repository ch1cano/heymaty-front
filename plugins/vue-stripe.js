import Vue from 'vue';
import { StripeElementPayment } from '@vue-stripe/vue-stripe';

export default () => {
    Vue.component('StripeElementPayment', StripeElementPayment);
};