document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');

    // 로컬 스토리지에서 할일 목록 불러오기
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // 할일 목록 화면에 표시
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
                <button class="delete-btn">삭제</button>
            `;
            
            if (todo.completed) {
                li.classList.add('completed');
            }

            // 애니메이션 효과 추가
            li.style.opacity = '0';
            li.style.transform = 'translateY(20px)';
            setTimeout(() => {
                li.style.transition = 'all 0.3s ease';
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
            }, 50 * index);

            // 체크박스 이벤트
            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => toggleTodo(index));

            // 삭제 버튼 이벤트
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTodo(index));

            todoList.appendChild(li);
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 새로운 할일 추가
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            renderTodos();
        }
    }

    // 할일 완료/미완료 토글
    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    // 할일 삭제
    function deleteTodo(index) {
        const li = todoList.children[index];
        li.style.transform = 'translateX(100px)';
        li.style.opacity = '0';
        
        setTimeout(() => {
            todos.splice(index, 1);
            renderTodos();
        }, 300);
    }

    // 이벤트 리스너
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // 초기 렌더링
    renderTodos();
});
