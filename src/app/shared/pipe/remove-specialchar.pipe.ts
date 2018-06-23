import {Pipe , PipeTransform }  from '@angular/core'
import { PipeDecorator } from '@angular/core/src/metadata/directives';


@Pipe({
    name:'removeSpecialCharPipe'

})

export class RemoveSpeciaCharPipe implements PipeTransform{

    transform(value:string, character:string):string{
                   return  value.replace(character, '')
    }
}