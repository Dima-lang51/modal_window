let fruits = [
  {id: 1, title: 'Яблоки', price: 20, img: 'https://foodcity.ru/storage/products/October2018/ZsF1ZRaz0BMtW5ieBq5d.jpg'},
  {id: 2, title: 'Апельсин', price: 30, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxPTvbWzYsyIggSkMdPp2TzWQz2FSO8jPJcQ&usqp=CAU'},
  {id: 3, title: 'Манго', price: 40, img: 'https://st3.depositphotos.com/1020804/12760/i/600/depositphotos_127608560-stock-photo-mango-cubes-and-mango-fruit.jpg'},
]

const toHTML = fruit =>`
  <div class="col">
        <div class="card">
          <img class="card-img-top" style="height: 300px; width: 300px;" src="${fruit.img}" alt="${fruit.title}">
          <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Просмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
          </div>
        </div>
  </div>
`

function render() {
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal( {
  title: 'Цена на товар',
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Закрыть', type: 'primary', handler() {
      priceModal.close()
    }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены',
      content: `<p>Вы удаляете: <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id)
      render()
    }).catch( () => {
      console.log('Cancle')
    })
   }
})
