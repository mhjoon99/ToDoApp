const createBtn = document.getElementById('create-btn');
const list = document.getElementById('list');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성.
    const item = {
        id: new Date().getTime(),
        text:'',
        complete: false
    }

    // 배열에 처음에 새로운 아이템을 추가
    todos.unshift(item);

    // 요소 생성하기
    const {
        itemEl,
        inputEl,
        editBtnEl,
        removeBtnEl
    } = createTodoElement(item)

    // 리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl);

    // disabled 속성 제거
    inputEl.removeAttribute('disabled');

    // input 요소에 focus
    inputEl.focus();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circle';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    // 큰 요소에 작은 요소 넣어주기
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {
        itemEl,
        inputEl,
        editBtnEl,
        removeBtnEl
    }
}