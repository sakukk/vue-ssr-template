import { createApp } from "./app";

export default function context () {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    router.push({path: context.url}).then(new Function()).catch(reject);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if(!matchedComponents.length){
        return reject({code: 404});
      }

      Promise.all(matchedComponents.map(Component => {
        if(Component.asyncData){
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);
  });
};
