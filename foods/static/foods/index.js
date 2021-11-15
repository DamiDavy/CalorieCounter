document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.url-container').forEach(item => {
    item.addEventListener('click', () => {
      content(item)
    })
  })
})

function content(item) {
  const content = document.querySelector(`#c-${item.id}`)
  if (content.style.display === 'none') {
    document.querySelectorAll('.content').forEach(item => item.style.display = 'none')
    content.style.display = 'block'
  } else {
    content.style.display = 'none'
  }
  item.scrollIntoView(top)
}