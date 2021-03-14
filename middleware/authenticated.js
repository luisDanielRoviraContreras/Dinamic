export default function ({ app, store, redirect }) {
  if (!store.state.authenticated && !app.$cookies.get('authenticated')) {
    return redirect('/login/')
  }
}
