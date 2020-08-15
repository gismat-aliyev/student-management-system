package az.com.studentmanagementsystem.controller;

import az.com.studentmanagementsystem.model.Student;
import az.com.studentmanagementsystem.service.StudentService;
import az.com.studentmanagementsystem.util.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/ui")
public class StudentController {

    @Autowired
    public StudentService studentService;


    @GetMapping("/index")
    public ModelAndView indexPage() {
        return new ModelAndView("main");
    }

    @GetMapping("/allStudent")
    public ResponseEntity<?> getStudentList() {
        List<Student> studentList = studentService.studentList();
        return new ResponseEntity<>(studentList, HttpStatus.OK);
    }

    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudent(@RequestParam("name") String name,
                                        @RequestParam("surname") String surname,
                                        @RequestParam("dateOfBirth") Date dateOfBirth,
                                        @RequestParam("section") String section) {

        Student student = new Student();
        student.setDateOfBirth(dateOfBirth);
        student.setSection(section);
        student.setSurname(Validation.checkNameOrSurname(surname));
        student.setName(Validation.checkNameOrSurname(name));
        studentService.addStudent(student);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/updateStudent")
    public ResponseEntity<?> updateStudent(@RequestParam("name") String name,
                                           @RequestParam("surname") String surname,
                                           @RequestParam("dateOfBirth") Date dateOfBirth,
                                           @RequestParam("section") String section,
                                           @RequestParam("id") Long id) {

        Student student = new Student();
        student.setDateOfBirth(dateOfBirth);
        student.setSection(section);
        student.setSurname(Validation.checkNameOrSurname(surname));
        student.setName(Validation.checkNameOrSurname(name));
        student.setId(id);
        studentService.updateStudent(student);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteStudent")
    public ResponseEntity<?> deleteStudent(@RequestParam("id") Long id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/editStudent")
    public ResponseEntity<?> editStudent(@RequestParam("id") Long id) {
        Student student = studentService.getStudentById(id);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam("name") String name) {
        List<Student> student = studentService.getStudentByName(name);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }


}
