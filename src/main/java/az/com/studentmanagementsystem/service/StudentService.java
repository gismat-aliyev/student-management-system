package az.com.studentmanagementsystem.service;

import az.com.studentmanagementsystem.model.Student;

import java.util.List;

public interface StudentService {

    List<Student> studentList();

    void addStudent(Student student);

    void updateStudent(Student student);

    Student getStudentById(Long id);

    void deleteStudent(Long id);

    List<Student> getStudentByName(String name);
}
