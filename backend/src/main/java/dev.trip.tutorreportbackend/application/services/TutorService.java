package dev.trip.tutorreportbackend.application.services;

import dev.trip.tutorreportbackend.application.models.dto.TutorResponse;
import dev.trip.tutorreportbackend.application.models.entities.Tutor;
import dev.trip.tutorreportbackend.application.repositories.TutorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorService {

    private final TutorRepository tutorRepository;
    private final TutorMapper tutorMapper;

    public TutorService(TutorRepository tutorRepository, TutorMapper tutorMapper) {
        this.tutorRepository = tutorRepository;
        this.tutorMapper = tutorMapper;
    }

    public void addTutor(Tutor... tutors){
        tutorRepository.saveAll(List.of(tutors));
    }

    public List<TutorResponse> getTutors(){
        return tutorRepository.findAll().stream().map(tutorMapper).toList();
    }
}
