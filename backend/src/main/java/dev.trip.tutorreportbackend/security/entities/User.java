package dev.trip.tutorreportbackend.security.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Getter
@Setter
@ToString
@Entity(name = "User")
@Table(name = "users",
        uniqueConstraints = {@UniqueConstraint(
                name = "user_email_unique",
                columnNames = "email"
        )})
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type")
public class User implements UserDetails {

    @Column(
            name = "first_name",
            unique = false,
            nullable = true,
            updatable = true
    )
    protected String firstName;

    @Column(
            name = "last_name",
            unique = false,
            nullable = true,
            updatable = true
    )
    protected String LastName;

    @Id
    @Column(
            name = "email",
            unique = true,
            nullable = false,
            updatable = true
    )
    protected String email;

    @Column(
            name = "password",
            unique = false,
            nullable = false,
            updatable = true
    )
    protected String password;

    @Column(
            name = "locked",
            unique = false,
            nullable = false,
            updatable = true
    )
    private boolean lockedAccount;

    @Column(
            name = "enabled",
            unique = false,
            nullable = false,
            updatable = true
    )
    private boolean enabledAccount;

    @CreationTimestamp
    private LocalDateTime created;

    @UpdateTimestamp
    private LocalDateTime edited;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('USER','ADMIN')")
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "user_authorities",
            foreignKey = @ForeignKey(name = "fkey_user_role")
    )
    private final Set<Role> authorities = new HashSet<>();


    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        LastName = lastName;
        this.email = email;
        this.password = password;
    }

    public User(String firstName, String lastName, String email, String password, boolean lockedAccount, boolean enabledAccount) {
        this.firstName = firstName;
        LastName = lastName;
        this.email = email;
        this.password = password;
        this.lockedAccount = lockedAccount;
        this.enabledAccount = enabledAccount;
    }

    public void addRoles(Role ... roles){
        authorities.addAll(List.of(roles));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.lockedAccount;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabledAccount;
    }
}
