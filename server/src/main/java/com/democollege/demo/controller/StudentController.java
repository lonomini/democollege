package com.democollege.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.democollege.demo.entity.Student;
import com.democollege.demo.security.JwtService;
import com.democollege.demo.security.LoginUserDetails;
import com.democollege.demo.component.CourseAddRequest;
import com.democollege.demo.component.LoginForm;
import com.democollege.demo.component.LoginResponse;
import com.democollege.demo.component.StudAddCourseRequest;
import com.democollege.demo.entity.Course;
import com.democollege.demo.entity.Staff;
import com.democollege.demo.service.CourseService;
import com.democollege.demo.service.StaffServcie;
import com.democollege.demo.service.StudentService;
import com.democollege.demo.service.TeacherService;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.democollege.demo.entity.Teacher;
import org.springframework.web.bind.annotation.RequestParam;




@RestController    
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StudentController {

    @Autowired
    StudentService studentService;
    
    @Autowired
    CourseService courseService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    StaffServcie staffServcie;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Normal 
    
    @PostMapping("/login")
    @CrossOrigin
    public LoginResponse login(@RequestBody LoginForm loginForm) {
        Authentication token = new UsernamePasswordAuthenticationToken(loginForm.getEmail()+"["+loginForm.getRole()+"]", loginForm.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        LoginUserDetails user = (LoginUserDetails) auth.getPrincipal();
        
        String jwt = jwtService.createLoginAccessToken(user);

        return new LoginResponse(user.getId(), user.getName(), jwt);
    }
    
    // Student section 

    @PostMapping("/student/add")
    public String addStudent(@RequestBody Student student) {
        Student stud_check = studentService.findByEmail(student.getEmail());

        if(stud_check == null){
            String encodedPassword = passwordEncoder.encode(student.getPassword());
            student.setPassword(encodedPassword);
            studentService.save(student);            

            return "Registered successfully.";
        }else{
            return "Email already registered.";
        }
    }

    @GetMapping("/student/list")
    public ResponseEntity<Iterable<Student>> getStudentList() {
        Iterable<Student> studentList = studentService.findAll();
        return ResponseEntity.ok(studentList);
    }

    @GetMapping("/student/list/{Id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer Id) {
        Optional<Student> student = studentService.findById(Id);
        return ResponseEntity.ok(student.orElse(null));
    }

    @PostMapping("/student/addcourse")
    public ResponseEntity<Integer> studentAddCourse(@RequestBody StudAddCourseRequest request) {

        // return 1 success, 0 already registered, -1 failure

        Optional<Student> studentOptional = studentService.findById(request.getStudentId());
        Optional<Course> courseOptional = courseService.findById(request.getCourseId());

        if(studentOptional.isEmpty() | courseOptional.isEmpty()){
            return ResponseEntity.status(501).body(-1);
        }

        Student student = studentOptional.get();
        Course course = courseOptional.get();

        List<Course> courseList = student.getCourses();

        if(courseList.contains(course)){
            return ResponseEntity.status(202).body(0);
        }
        
        courseList.add(course);
        studentService.save(student);

        return ResponseEntity.status(200).body(1);
    }    

    @GetMapping("/student/checkCourseApplied")
    public ResponseEntity<Integer> checkCourseApplied(@RequestParam Integer sid, @RequestParam Integer cid) {
        return ResponseEntity.status(200).body(checkIfCourseAdded(sid, cid));
    }
    
    private Integer checkIfCourseAdded(Integer sid, Integer cid){

        // return 1 mean already added
        // return 0 mean not added yet
        // return -1 mean cannot find either student or course 

        Optional<Student> studentOptional = studentService.findById(sid);
        Optional<Course> courseOptional = courseService.findById(cid);

        if(studentOptional.isEmpty() | courseOptional.isEmpty()){
            return -1;
        }

        Student student = studentOptional.get();
        Course course = courseOptional.get();

        List<Course> courseList = student.getCourses();

        if(courseList.contains(course)){
            return 1;
        }else{
            return 0;
        }
    }
    
    @GetMapping("/student/home")
    public ResponseEntity<Student> studentHomePage() {

        LoginUserDetails studentUserDetails = (LoginUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Student> student = studentService.findById(studentUserDetails.getId());

        return ResponseEntity.ok(student.orElse(null));
    }

    /****  Teacher sections *****/ 

    @PostMapping("/teacher/add")
    public String addTeacher(@RequestBody Teacher teacher) {
        Teacher teacher_check = teacherService.findByEmail(teacher.getEmail());

        if(teacher_check == null){
            String encodedPassword = passwordEncoder.encode(teacher.getPassword());
            teacher.setPassword(encodedPassword);
            teacherService.save(teacher);
            return "done";
        }else{
            return "email already registered.";
        }
    }

    @GetMapping("/teacher/list")
    public Iterable<Teacher> getTeacherList() {
        Iterable<Teacher> list = teacherService.findAll();
        return list;
    }

    @GetMapping("/teacher/list/{id}")
    public Teacher getTeacherById(@PathVariable Integer id) {
        Optional<Teacher> teacher = teacherService.findById(id);
        return teacher.get();
    }
    
    @GetMapping("/teacher/home")
    public ResponseEntity<Teacher> teacherHomePage() {

        LoginUserDetails teacherUserDetails = (LoginUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Teacher> teacher = teacherService.findById(teacherUserDetails.getId());

        return ResponseEntity.ok(teacher.orElse(null));
    }

    /****** Admin section *****/ 

    @PostMapping("/staff/add")
    public String addStudent(@RequestBody Staff staff) {
        Staff staff_check = staffServcie.findByEmail(staff.getEmail());

        if(staff_check == null){
            String encodedPassword = passwordEncoder.encode(staff.getPassword());
            staff.setPassword(encodedPassword);
            staffServcie.save(staff);    

            return "done";
        }else{
            return "email already registered.";
        }
    }

    @PostMapping("/staff/update")
    public String updateStudent(@RequestBody Staff staff) {
        Staff staff_check = staffServcie.findByEmail(staff.getEmail());

        if(staff_check != null){
            String encodedPassword = passwordEncoder.encode(staff.getPassword());
            staff_check.setName(staff.getName());
            staff_check.setPassword(encodedPassword);
            staff_check.setAuthorities(staff.getAuthorities());
            staffServcie.save(staff_check);    

            return "Account udpated: "+staff_check.getEmail();
        }else{
            return "Account does not exist.";
        }
    }

    @GetMapping("/staff/list")
    public ResponseEntity<Iterable<Staff>> getStaffList() {
        Iterable<Staff> list  = staffServcie.findAll();
        return ResponseEntity.ok(list);
    }
    
    @GetMapping("/staff/list/{Id}")
    public ResponseEntity<Staff> getStaff(@PathVariable Integer Id) {
        Optional<Staff> staff = staffServcie.findById(Id);
        return ResponseEntity.ok(staff.orElse(null));
    }

    /*****  Course section   *****/ 

    @PostMapping("/course/add")
    public String addCourse(@RequestBody CourseAddRequest request) {
        Course course = new Course();
        course.setName(request.getName());
        course.setDescription(request.getDescription());

        // check if the teacher id = null or not, 
        // if teacher id is null, mean temporarily no teacher during creation.
        // if teacher is not correct, no course created.
        if(request.getTeacherId() != null){
            Optional<Teacher> teacherOptional = teacherService.findById(request.getTeacherId());

            if(teacherOptional.isEmpty()){
                return "Teacher Id is not valid.";
            }else{
                course.setTeacher(teacherOptional.get());
            } 
        }        

        courseService.save(course);
        return "Course created.";
    }

    @GetMapping("/course/list")
    public ResponseEntity<Iterable<Course>> getCourseList() {
        Iterable<Course> courseList = courseService.findAll();
        return ResponseEntity.ok(courseList);
    }

    @GetMapping("/course/list/{Id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Integer Id) {
        Optional<Course> course = courseService.findById(Id);
        return ResponseEntity.ok(course.get());
    }

    @PostMapping("/course/udpate/{id}")
    public String updateCourse(@PathVariable Integer id, @RequestBody CourseAddRequest request){
        Optional<Course> courseOptional = courseService.findById(id);
        if(courseOptional.isEmpty()){
            return "Course not exist.";
        }

        Course course =  courseOptional.get();
        course.setName(request.getName());
        course.setDescription(request.getDescription());

        if(request.getTeacherId() != null){
            Optional<Teacher> teacherOptional = teacherService.findById(request.getTeacherId());

            if(teacherOptional.isEmpty()){
                return "Teacher Id is not valid.";
            }else{
                course.setTeacher(teacherOptional.get());
            } 
        }  

        courseService.save(course);
        
        return "Course detail updated.";
    }

}
