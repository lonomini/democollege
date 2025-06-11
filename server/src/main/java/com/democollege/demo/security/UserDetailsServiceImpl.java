package com.democollege.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.democollege.demo.entity.Role;
import com.democollege.demo.entity.Student;
import com.democollege.demo.entity.Teacher;
import com.democollege.demo.entity.Staff;
import com.democollege.demo.service.StaffServcie;
import com.democollege.demo.service.StudentService;
import com.democollege.demo.service.TeacherService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    private StudentService studentService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private StaffServcie staffServcie;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        int n = email.indexOf("[");
        String role = email.substring(n+1, email.length()-1);
        String emailExtracted = email.substring(0, n);
        
        if(role.compareToIgnoreCase(Role.STUDENT.name()) == 0){            
            Student student = studentService.findByEmail(emailExtracted);   
            if(student == null)
                throw new UsernameNotFoundException("No User Found.");
            else         
                return new LoginUserDetails(student, Role.STUDENT);

        }else if(role.compareToIgnoreCase(Role.TEACHER.name()) == 0){
            Teacher teacher = teacherService.findByEmail(emailExtracted);
            if(teacher == null)
                throw new UsernameNotFoundException("No User Found.");
            else
                return new LoginUserDetails(teacher, Role.TEACHER);

        }else if(role.compareToIgnoreCase(Role.ADMIN.name()) == 0){
            Staff staff = staffServcie.findByEmail(emailExtracted);
            
            if(staff == null)
                throw new UsernameNotFoundException("No User Found.");
            else
                return new LoginUserDetails(staff, Role.ADMIN);
        }else{            
            throw new UsernameNotFoundException("No User Found.");
        }

    }
}
