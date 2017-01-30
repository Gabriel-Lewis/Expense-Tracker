export const createReport = (report, success) => {
  $.ajax({
    url: '/api/reports',
    method: 'POST',
    data: { report },
    success: success
  });
}

export const updateReport = (report, success) => {
  $.ajax({
    url: `/api/reports/${report.id}`,
    method: 'PATCH',
    data: { report },
    success: success
  });
}

export const deleteReport = (id, success) => {
  $.ajax({
    url: `api/reports/${id}`,
    method: 'DELETE',
    success: success
  });
};

export const fetchReport = (id, success) => {
  $.ajax({
    url: `/api/reports/${id}`,
    success: success
  });
};

export const fetchReports = success => {
  $.ajax({
    url: `/api/reports`,
    success: success
  });
};
