package dev.trip.tutorreportbackend.security.utilities;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Getter
@Component
public class RSAKeySet {

    private final RSAPublicKey publicKey;
    private final RSAPrivateKey privateKey;

    public RSAKeySet(){
        KeyPair pair = generateRSAKeyPair();
        this.publicKey = (RSAPublicKey) pair.getPublic();
        this.privateKey = (RSAPrivateKey) pair.getPrivate();
    }

    private static KeyPair generateRSAKeyPair(){
        KeyPair keyPair;

        try{
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        }
        catch(Exception e){
            throw new IllegalStateException();
        }

        return keyPair;
    }

}