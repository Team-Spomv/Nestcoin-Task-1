export const isMetaMaskConnected = (listOfAccounts) => {
  return listOfAccounts && listOfAccounts.length > 0
}

export const requestAccounts = async () => {
  const { ethereum } = window;

  const newAccounts = await ethereum.request({
    method: 'eth_requestAccounts',
  })
    .catch((error) => {
      console.error(error)
    })
  return newAccounts
}
