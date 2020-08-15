function getBaseUrl() {
    let url = window.location;
    return url.protocol + "//" + url.host + "/student/ui/";
}

function reloadPage() {
    window.location.reload();
}

function logout() {
    let url = window.location;
    window.location.href = url.protocol + "//" + url.host + "/student/logout";
}


function clearNav(name) {
    $('#navbar').empty();
    $('#addLi').empty();
    $('#navbar').append('<a class="navbar-brand">Tələbə siyahısı - ' + name + '</a>');
}

function removeTableBody() {
    $('#studentTable tbody').empty();
}

function hideStudentTable() {
    $('#studentTable').empty();
}

$(document).ready(
    $.ajax({
        url: getBaseUrl() + 'allStudent',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var event_data = '';
            $.each(data, function (index, value) {

                event_data += '<tbody class="ui-widget-content">';
                event_data += '   <tr>';
                event_data += '      <td>&nbsp;&nbsp;' + value.name + '</td>';
                event_data += '      <td>&nbsp;&nbsp;' + value.surname + '</td>';
                event_data += '      <td>&nbsp;&nbsp;' + value.dateOfBirth + '</td>';
                event_data += '      <td>&nbsp;&nbsp;' + value.section + '</td>';
                event_data += '      <td>';
                event_data += '         <a onclick="editStudent(' + value.id + ')" data-toggle="modal" data-target="#updateModal" class="btn btn-success" >Dəyiş</a>&nbsp;&nbsp;&nbsp;&nbsp;';
                event_data += '         <a class="btn btn-danger" onclick="deleteQuestion(' + value.id + ')" data-toggle="modal" data-target="#deleteModal">Sil</a>&nbsp;&nbsp;&nbsp;&nbsp;';
                event_data += '      </td>';
                event_data += '   </tr>';
                event_data += '</tbody>';
            });
            $("#studentTable").append(event_data);

        },
        error: function () {
            var event_data = '';
            event_data += '<tbody class="ui-widget-content">';
            event_data += '   <tr>';
            event_data += '      <td>Tələbə siyahısı boşdur</td>';
            event_data += '   </tr>';
            event_data += '</tbody>';

            $("#studentTable").append(event_data);
        }
    })
);


function editStudent(id) {
    getUpdateModal();
    $.ajax({
        url: getBaseUrl() + 'editStudent',
        data: 'id=' + id,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            $('#nameUpdate').val(data.name);
            $('#surnameUpdate').val(data.surname);
            $('#dobUpdate').val(data.dateOfBirth);
            $('#sectionUpdate').val(data.section);
            $('#idUpdate').val(data.id);
        }
    });
}

function deleteQuestion(id) {
    getDeleteModal();
    $.ajax({
        url: getBaseUrl() + 'editStudent',
        data: 'id=' + id,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            $('#nameDelete').val(data.name + ' ' + data.surname);
            $('#idDelete').val(data.id);
        }
    });
}

function deleteStudent() {
    var id = $('#idDelete').val();
    $.ajax({
        url: getBaseUrl() + 'deleteStudent',
        data: 'id=' + id,
        type: 'DELETE',
        success: function () {
            reloadPage();
        }
    });
}


function getAddModal() {
    $('#addModal').modal({
        backdrop: 'static'
    });
}

function getUpdateModal() {
    $('#updateModal').modal({
        backdrop: 'static'
    });
}

function getDeleteModal() {
    $('#deleteModal').modal({
        backdrop: 'static'
    });
}


function addStudent() {
    let name = $("#name").val();
    let surname = $("#surname").val();
    let dob = $("#dob").val();
    let section = $("#section").val();
    $.ajax({
        url: getBaseUrl() + 'addStudent',
        data: 'name=' + name + '&surname=' + surname + '&dateOfBirth=' + dob + '&section=' + section,
        type: 'POST',
        dataType: 'text',
        success: function () {
            $('#addModal').modal('hide');
            reloadPage();
        }
    });
}


function updateStudent() {
    let id = $("#idUpdate").val();
    let name = $("#nameUpdate").val();
    let surname = $("#surnameUpdate").val();
    let dob = $("#dobUpdate").val();
    let section = $("#sectionUpdate").val();
    $.ajax({
        url: getBaseUrl() + 'addStudent',
        data: 'name=' + name + '&surname=' + surname + '&dateOfBirth=' + dob + '&section=' + section + '&id=' + id,
        type: 'PUT',
        dataType: 'text',
        success: function () {
            $('#updateModal').modal('hide');
            reloadPage();
        }
    });
}


// ---------------------search process start--------------------
function search() {
    removeTableBody();
    var name = $('#nameSearch').val();

    $.ajax({
        url: getBaseUrl() + 'search',
        data: 'name='+name,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            clearNav(name);

            var event_data = '';
            $.each(data, function (index, value) {

                event_data += '<tbody class="ui-widget-content">';
                event_data += '   <tr>';
                event_data += '      <td>&nbsp;&nbsp;' + value.name + '</td>';
                event_data += '      <td>&nbsp;&nbsp;' + value.surname + '</td>';
                event_data += '      <td>&nbsp;&nbsp;' + value.dateOfBirth + '</td>';
                event_data += '      <td>&nbsp;&nbsp;' + value.section + '</td>';
                event_data += '      <td>';
                event_data += '         <a onclick="editStudent(' + value.id + ')" data-toggle="modal" data-target="#updateModal" class="btn btn-success" >Dəyiş</a>&nbsp;&nbsp;&nbsp;&nbsp;';
                event_data += '         <a class="btn btn-danger" onclick="deleteQuestion(' + value.id + ')" data-toggle="modal" data-target="#deleteModal">Sil</a>&nbsp;&nbsp;&nbsp;&nbsp;';
                event_data += '      </td>';
                event_data += '   </tr>';
                event_data += '</tbody>';
            });
            $("#studentTable").append(event_data);

        },
        error: function () {
            var event_data = '';
            event_data += '<tbody class="ui-widget-content">';
            event_data += '   <tr>';
            event_data += '      <td>Tələbə siyahıda mövcud deyil</td>';
            event_data += '   </tr>';
            event_data += '</tbody>';

            $("#studentTable").append(event_data);
        }
    })
}