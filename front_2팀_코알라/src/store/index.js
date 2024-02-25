import { createStore } from 'vuex'

import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            member: {
                member_email: '',
                member_number: '',
                member_type: '',
            }
        }
    },
    mutations: {
        member(state, data){
            state.member = data;
        }
    },
    plugins: [
        persistedstate({
            paths: ['member']
        })
    ]
});

export default store;