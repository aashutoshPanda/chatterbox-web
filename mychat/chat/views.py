from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def loginView(request):
    data = {
        "id": 1,
        "user_name": "swastik",
        "token": "asd3251355fdgas5fd45dflkjasdlk"
    }
    return Response(data)


@api_view(['POST'])
def signupView(request):
    data = {
        "id": 1,
        "user_name": "swastik",
        "token": "asd3251355fdgas5fd45dflkjasdlk"
    }

    return Response(data)


@api_view(['POST'])
def logoutView(request):
    return Response({"message": "Logged out"})
