package tech.khallaghi.auth.dto;

public class AuthDto {
    public record Request(String username, String password) {}
    public record Response(boolean success, String message, String jwt) {}
}