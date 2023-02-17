from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.therapy import (
    TherapyIn, TherapyOut,
    TherapyRepository, Error, ClientIn, ClientOut, ClientRepository
)

router = APIRouter()


@router.post("/therapy", response_model=Union[TherapyOut, Error])
def create_therapy(therapy: TherapyIn, repo: TherapyRepository = Depends()):
    print("therapy", therapy)
    return repo.create_therapy(therapy)


@router.get("/therapy", response_model=Union[List[TherapyOut], Error])
def get_all(
    repo: TherapyRepository = Depends(),
):
    return repo.get_all()


@router.post("/client", response_model=Union[ClientOut, Error])
def create_client(client: ClientIn, repo: ClientRepository = Depends()):
    print("client", client)
    return repo.create_client(client)


@router.get("/client", response_model=Union[List[ClientOut], Error])
def get_all_clients(
    repo: ClientRepository = Depends(),
):
    return repo.get_all_clients()


@router.put("/client/{client_id}", response_model=Union[ClientOut, Error])
def update_client(
    client_id: int,
    client: ClientIn,
    repo: ClientRepository = Depends(),
) -> Union[Error, ClientOut]:
    return repo.update_client(client_id, client)

    
@router.get("/client/{client_id}", response_model=Optional[ClientOut])
def get_one_client(
    client_id: int,
    response: Response,
    repo: ClientRepository = Depends(),
) -> ClientOut:
    client = repo.get_one_client(client_id)
    if client is None:
        response.status_code = 404
    return client
