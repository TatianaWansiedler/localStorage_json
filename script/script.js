// First level: необходимо реализовать страницу, которая получает данные о товаре и 
//выводит информационные карточки с товарами. 
// В нижней части страницы должен быть расчет общей суммы. 
// Результат должен выглядеть приблизительно как на макете 
//https://www.figma.com/file/wRonUTYoOVL3ii4meCtdzR/Untitled?node-id=1%3A2&t=5i8ANTCkEpFzMpoi-0

// Необходимо реализовать сохранение карточек в localStorage.

//1. функции для записи и чтения localStorage

function writeLocal(products) {
    localStorage.setItem('products', JSON.stringify(products))
}
function readLocal() {
    return JSON.parse(localStorage.getItem('products')) ?? [];
}

//2. обработчик события формы 

const add_form = document.querySelector('.form');
const info = document.querySelector('.info')
const container = document.querySelector('.container')


add_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Date.now()
    const title = add_form.title.value
    const price = +add_form.price.value
    const count = +add_form.count.value

    writeLocal([...readLocal(), { id, title, price, count }])

    add_form.title.value = ''
    add_form.price.value = ''
    add_form.count.value = ''

    rerender()
})

//3. функция для создания карточки товара

function createCard(id, title, price, count) {
    const product = document.createElement('div')
    const del_btn = document.createElement('button')
    const product_title = document.createElement('p')
    const product_price = document.createElement('p')
    const product_count = document.createElement('p')

    del_btn.innerHTML = '<i class="lar la-trash-alt"></i>'  // добавила иконку для кнопки
    product_title.innerText = `${title}`
    product_price.innerText = `${price}`
    product_count.innerText = `${price} x ${count} = ${price * count}`

    product.append(del_btn, product_title, product_price, product_count)

    del_btn.classList.add('btn-del')
    product.classList.add('product')

    del_btn.addEventListener('click', () => deleteCard(id))

    return product
}
//4. функция для удаления карточки товара

function deleteCard(deletedId) {
    const filteredProducts = readLocal().filter(({ id }) => id !== deletedId)
    writeLocal(filteredProducts)
    rerender()
}

//5. функция для подсчета и отображения общей стоимости 

function showTotalAmount() {

    const sum_p = document.createElement('p')
    const count_p = document.createElement('p')
    info.append(sum_p, count_p);

    const total_sum = readLocal().reduce((sum, { price, count }) => sum + (price * count), 0)
    const total_count = readLocal().reduce((sum, { count }) => sum + count, 0)

    sum_p.innerText = `Общая стоимость: ${total_sum}`
    count_p.innerText = `Общее количество: ${total_count}`
}

//6. функция rerender 


function rerender() {
    container.innerText = ''
    info.innerText = ''

    readLocal().forEach(({ id, title, price, count }) => {
        const product = createCard(id, title, price, count)
        container.append(product);
    })

    if (readLocal().length === 0) {
        info.innerText = '* Товары отсутствуют. Заполните информацию о товаре выше'
    } else {
        showTotalAmount()
    }

}

rerender()