from fastapi import HTTPException, status


def with_errors(*errors: HTTPException):
    d = {}
    for err in errors:
        if err.status_code in d:
            d[err.status_code]["description"] += f"\n\n{err.detail}"
        else:
            d[err.status_code] = {"description": err.detail}
    return d


def server_overloaded():
    return HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                         detail='Server overloaded!')


def undefined_server_error():
    return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                         detail='Undefined server behavior occurred!')


def image_not_found():
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                         detail='Image not found!')
