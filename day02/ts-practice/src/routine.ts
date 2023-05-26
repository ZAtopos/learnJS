function log(param: string) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
      console.log('target:', target)
      console.log('name:', name)
      console.log('descriptor:', descriptor)
  
      console.log('param:', param)
    }
  }
  
  class Employee {
  
    @log('with param')
    routine() {
      console.log('Daily routine')
    }
  }
  
  const e = new Employee()
  e.routine()
  