export const createExpense = (expense, success) => {
  $.ajax({
    url: '/api/expenses',
    method: 'POST',
    data: { expense },
    success: success
  });
}

export const updateExpense = (expense, success) => {
  $.ajax({
    url: `/api/expenses/${expense.id}`,
    method: 'PATCH',
    data: { expense },
    success: success
  });
}

export const deleteExpense = (id, success) => {
  $.ajax({
    url: `api/expenses/${id}`,
    method: 'DELETE',
    success: success
  });
};

export const fetchExpense = (id, success) => {
  $.ajax({
    url: `/api/expenses/${id}`,
    success: success
  });
};

export const fetchExpenses = success => {
  $.ajax({
    url: `/api/expenses`,
    success: success
  });
};
