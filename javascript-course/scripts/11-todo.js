
const todo_list = [];
const test_list = ['Waka', 'waka', 12]
function add_todo () 
{
    const todo = document.querySelector('.JS-input')
    const todo_date = document.querySelector('.JS-date')
    const name = todo.value
    const date = todo_date.value
    console.log(document.querySelector('.JS-date'))
    const todo_actual = {
        name,
        date
    }
    todo.value = ' '
    todo_list.push(todo_actual)

    render_todo()
}
function render_todo ()
{
    const message = document.querySelector('.JS-list')
    let html_todo = ' '

    todo_list.forEach((value, index) =>
    {
        const { name, date } = value;
        const msg = `
            <p>
                ${name} ${date} 
                <button class="JS-delete-button">Delete</button>
            </p>
        `;
        html_todo += msg;
    })
    message.innerHTML = html_todo

    document.querySelectorAll('.JS-delete-button').forEach((value, index) => {
        value.addEventListener('click', () => {
            todo_list.splice(index,1);
            render_todo()
        });
    });
}
