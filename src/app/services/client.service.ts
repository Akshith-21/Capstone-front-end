import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   client=[{
    "id":1,
    "email":"a720982@fmr.com"
},
{
    "id":2,
    "email":"a720918@fmr.com"
},
{
    "id":1,
    "email":"a720990@fmr.com"
},
{
    "id":1,
    "email":"a720917@fmr.com"
},
]



  constructor() { }
}
