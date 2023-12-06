package dev.trip.tutorreportbackend.security.configuration;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import dev.trip.tutorreportbackend.security.entities.Role;
import dev.trip.tutorreportbackend.security.utilities.RSAKeySet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final RSAKeySet keys;

    public SecurityConfiguration(RSAKeySet keys){
        this.keys = keys;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager getAuthenticationManager(UserDetailsService userDetailsService){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(daoAuthenticationProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        httpSecurity
                .cors(CorsConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable) // Cross-Site Request Forgery (CSRF)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("auth/register").hasRole(Role.ADMIN.getAuthority())
                        .requestMatchers("auth/login").permitAll()
                        .requestMatchers("reports/**").authenticated()
                        .requestMatchers("user/admin/**").hasRole(Role.ADMIN.getAuthority())
                        .requestMatchers("/tutor/**").hasRole(Role.USER.getAuthority())
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(server -> server
                        .jwt(token -> token
                                .jwtAuthenticationConverter(getJWTConverter())
                                .decoder(getJWTDecoder())
                        )
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        return httpSecurity.build();
    }


    @Bean
    public JwtDecoder getJWTDecoder(){
        return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();
    }

    @Bean
    public JwtEncoder getJWTEncoder(){
        JWK key = new RSAKey
                .Builder(keys.getPublicKey())
                .privateKey(keys.getPrivateKey())
                .build();

        JWKSource<SecurityContext> keySet = new ImmutableJWKSet<>(new JWKSet(key));

        return new NimbusJwtEncoder(keySet);
    }

    @Bean
    public JwtAuthenticationConverter getJWTConverter(){
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtConverter;
    }

}