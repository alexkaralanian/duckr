// mock auth component

export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Alex Karalanian',
        avatar: 'test',
        uid: 'alexkaralanian'
      })
    }, 2000)
  })
}
