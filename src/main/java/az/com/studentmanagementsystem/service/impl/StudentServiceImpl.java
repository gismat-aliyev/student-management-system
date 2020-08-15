package az.com.studentmanagementsystem.service.impl;

import az.com.studentmanagementsystem.exception.GlobalExceptionHandler;
import az.com.studentmanagementsystem.model.Student;
import az.com.studentmanagementsystem.repository.StudentRepository;
import az.com.studentmanagementsystem.service.StudentService;
import az.com.studentmanagementsystem.util.Validation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    private Logger logger = LogManager.getLogger(StudentServiceImpl.class);

    public GlobalExceptionHandler globalExceptionHandler;

    @Autowired
    public StudentRepository studentRepository;

    @Override
    public List<Student> studentList() {
        List<Student> studentList = null;
        try {
            logger.info("Get all students...");
            studentList = studentRepository.findAll();
        } catch (Exception ex) {
            globalExceptionHandler.handleAllExceptions(ex);
        }
        return studentList;
    }

    @Override
    public void addStudent(Student student) {
        try {
            studentRepository.save(student);
            logger.info("Add new student : " + student);
        } catch (Exception ex) {
            globalExceptionHandler.handleAllExceptions(ex);
        }
    }

    @Override
    public void updateStudent(Student student) {
        try {
            studentRepository.save(student);
            logger.info("Update student. Update info : " + student);
        } catch (Exception ex) {
            globalExceptionHandler.handleAllExceptions(ex);
        }
    }

    @Override
    public Student getStudentById(Long id) {
        Student student = null;
        try {
            student = studentRepository.findById(id).orElse(null);
            logger.info("Get students info by id. info : " + student);
        } catch (Exception ex) {
            globalExceptionHandler.handleAllExceptions(ex);
        }
        return student;
    }

    @Transactional
    @Override
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        try {
            studentRepository.deleteById(id);
            logger.info("Delete student : " + student);
        } catch (Exception ex) {
            globalExceptionHandler.handleAllExceptions(ex);
        }
    }

    @Override
    public List<Student> getStudentByName(String name) {
        List<Student> studentList = null;
        try {
            name = Validation.checkNameOrSurname(name);
            studentList = studentRepository.findByName(name);
            logger.info("Search student by name. Name : " + name);
            logger.info("Search result : " + studentList);
        } catch (Exception ex) {
            globalExceptionHandler.handleAllExceptions(ex);
        }
        return studentList;
    }
}

