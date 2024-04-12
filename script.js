const inputElem = document.getElementById('password')

let passwordLength = 16 

const upperCaseCheckEl = document.getElementById('uppercase-check')
const numbersCheckEl = document.getElementById('numbers-check')
const symbolsCheckEl = document.getElementById('symbols-check')
const securityIndicatorBarEl = document.getElementById('security-indicator-bar')
const renewButtonEl = document.getElementById('renew-image')

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz"
  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numbersChars = "123456789"
  const symbolsChars = "?!@&*()[]"

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars
  }

  if (numbersCheckEl.checked) {
    chars += numbersChars
  }

  if (symbolsCheckEl.checked) {
    chars += symbolsChars
  }
  
  let password = ""

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }
  inputElem.value = password
  calculatePasswordQuality()
  calculateFontSize()
}

function copyPassword() {
  navigator.clipboard.writeText(inputElem.value)
}

const passwordLengthEl = document.getElementById('password-length')
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value
  document.getElementById('password-length-text').innerText = passwordLength
  generatePassword()
})

function calculatePasswordQuality() {
  let percent = 0
  if (passwordLength < 9) {
    percent = Math.round(
      (passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 6 : 0) +
        (numbersCheckEl.checked ? 10 : 0) +
        (symbolsCheckEl.checked ? 10 : 0)
    )
  } else if (passwordLength < 17){
    percent = Math.round(
      (passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 10 : 0) +
        (numbersCheckEl.checked ? 20 : 0) +
        (symbolsCheckEl.checked ? 35 : 0)
    )
  } else {
    percent = Math.round(
      (passwordLength / 64) * 35 +
        (upperCaseCheckEl.checked ? 10 : 0) +
        (numbersCheckEl.checked ? 20 : 0) +
        (symbolsCheckEl.checked ? 35 : 0)
    )
  }

  if (percent > 69) {
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.add('safe')
  } else if (percent > 30) {
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.add('warning')
    securityIndicatorBarEl.classList.remove('safe')
  } else {
    securityIndicatorBarEl.classList.add('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.remove('safe')
  }
  
  if ( percent == 100) {
    securityIndicatorBarEl.classList.add('completed')
  }

  securityIndicatorBarEl.style.width = `${percent}%`
}

function calculateFontSize() {
  if (passwordLength > 42) {
    inputElem.classList.remove("font-sm")
    inputElem.classList.remove("font-xs")
    inputElem.classList.add("font-xxs")
  } else if (passwordLength > 30) {
    inputElem.classList.remove("font-sm")
    inputElem.classList.add("font-xs")
    inputElem.classList.remove("font-xxs")
  } else {
    inputElem.classList.add("font-sm")
    inputElem.classList.remove("font-xs")
    inputElem.classList.remove("font-xxs")
  }
}

upperCaseCheckEl.addEventListener('click', generatePassword)
numbersCheckEl.addEventListener('click', generatePassword)
symbolsCheckEl.addEventListener('click', generatePassword)
renewButtonEl.addEventListener('click', generatePassword)

document.getElementById('copy-image').addEventListener('click', copyPassword)
document.getElementById('copy-button').addEventListener('click', copyPassword)

generatePassword()
