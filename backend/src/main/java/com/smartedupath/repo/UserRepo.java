package com.smartedupath.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartedupath.model.UserProfile;

@Repository
public interface UserRepo extends JpaRepository<UserProfile, String>{

}
