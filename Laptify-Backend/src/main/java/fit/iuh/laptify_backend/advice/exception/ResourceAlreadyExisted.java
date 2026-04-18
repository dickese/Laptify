package fit.iuh.laptify_backend.advice.exception;

public class ResourceAlreadyExisted extends RuntimeException{
    public ResourceAlreadyExisted(String message) {
        super(message);
    }
}
