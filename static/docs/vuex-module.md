```
// 模块化
modules: {
  foo: {
    namespaced: true,

    getters: {
      // `getters` is localized to this module's getters
      // you can use rootGetters via 4th argument of getters
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
        rootGetters['bar/someOtherGetter'] // -> 'bar/someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // dispatch and commit are also localized for this module
      // they will accept `root` option for the root dispatch/commit
      someAction ({ state, dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'
        rootGetters['bar/someGetter'] // -> 'bar/someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    },
    mutations: {
       SET_AGE: (state) {state.age++},
       ADD_JONE_AGE: (state) {Vue.set(stage.jone, 'age', 23)}   // 数组或对象的修改要使用Vue.set
    }
  }
}
```

```
// vue文件
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
computed: {
  ...mapState('room', ['roomVO', 'playerHandCard']),
  ...mapGetters('room', ['seatCount', 'playerList', 'curPlayer', 'roundPlayer', 'curPlayerHandCard', 'curPlayerStatus']),
},
methods: {
  // ...mapActions('room', ['clickPlayerHandCard']),
  ...mapActions('card', ['cardOnClick']),
  ...mapMutations('room', [])
}
```
