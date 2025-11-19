package com.example.demo.userlogin;

import org.springframework.stereotype.Service;

import com.example.demo.userlogin.DTO.UserLoginRequest;
import com.example.demo.userlogin.DTO.UserSignUpRequest;

@Service
public class UserService {
    private final UserDataRepository userDataRepository;

    public UserService(UserDataRepository userDataRepository){
        this.userDataRepository = userDataRepository;
    }

    public UserData signUp(UserSignUpRequest request){

        if(userDataRepository.findByUsername(request.getUsername()).isPresent()){
            throw new IllegalArgumentException("이미 사용 중인 사용자 이름입니다.");
        }

        UserData newUser = new UserData(request.getUsername(), request.getPassword());

        return userDataRepository.save(newUser);
    }

    public String login(UserLoginRequest request){
        UserData user = userDataRepository.findByUsername(request.getUsername())
                // .orElseThrow() : "결과가 있으면 User 객체를 주고, 없으면(Optional이 비어있으면) 예외를 발생시켜."
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if(!user.getPassword().equals(request.getPassword())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        return "로그인 성공!";
    }
}
