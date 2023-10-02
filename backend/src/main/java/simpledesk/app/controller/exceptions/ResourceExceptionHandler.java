package simpledesk.app.controller.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import simpledesk.app.service.exceptions.*;

import java.time.LocalDateTime;

@ControllerAdvice
public class ResourceExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(ResourceExceptionHandler.class);

    // Exceções genéricas
    @ExceptionHandler(Throwable.class)
    public ResponseEntity<String> handleUnexpectedException(Throwable unexpectedException) {
        var message = "Erro inesperado, verifique os logs.";
        logger.error(message, unexpectedException);
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<StandardError> accessDeniedException(HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.FORBIDDEN.value(), "Acesso negado.", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<StandardError> malformedJwtException(HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.FORBIDDEN.value(), "JWT malformado.", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<StandardError> expiredJwtException(HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.FORBIDDEN.value(), "JWT expirado.", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<StandardError> signatureException(HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.UNAUTHORIZED.value(), "Assinatura do JWT inválida.", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    // Exceções tratadas e utilizadas na camada de serviço.

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<StandardError> badCredentialsException(HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.UNAUTHORIZED.value(), "Credenciais incorretas.", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity<StandardError> objectNotFoundException(ObjectNotFoundException ex, HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(DataIntegratyViolationException.class)
    public ResponseEntity<StandardError> dataIntegratyViolationException(DataIntegratyViolationException ex, HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.CONFLICT.value(), ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(EmptyAttributeException.class)
    public ResponseEntity<StandardError> emptyAttributeException(EmptyAttributeException ex, HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(), ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<StandardError> badRequestException(BadRequestException ex, HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(), ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(CascadingDataBreachException.class)
    public ResponseEntity<StandardError> dataCascadingBreachExceptionException(CascadingDataBreachException ex, HttpServletRequest request) {
        StandardError error =
                new StandardError(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(), ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
