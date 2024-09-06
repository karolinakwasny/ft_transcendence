from django.http import JsonResponse

def get_data(request):
    # Sample data to return as JSON
    data = {
        'message': 'Hello, this is your user profile data!',
        'status': 'success',
        'data': [
            {'id': 1, 'name': 'Item 1'},
            {'id': 2, 'name': 'Item 2'},
            {'id': 3, 'name': 'Item 3'},
        ]
    }
    
    # Return the data as a JSON response
    return JsonResponse(data)