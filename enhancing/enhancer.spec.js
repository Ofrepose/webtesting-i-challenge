

const enhancer = require('./enhancer.js');
// test away!

describe("repair",()=>{
    it('should take in an object',()=>{
        expect(()=>{enhancer.repair("testing");
        }).toThrow();
        expect(()=>{enhancer.repair(5);
        }).toThrow();
        expect(()=>{enhancer.repair([]);
        }).toThrow();
        expect(()=>{enhancer.repair(false);
        }).toThrow();
        expect(()=>{enhancer.repair(undefined);
        }).toThrow();
    });

    it('Should return a new item with durability restored to 100', () => {
        let sword = {name:'somethingName',durability:40,enhancement:"none"};
      expect(enhancer.repair({
          name:"something",
          enhancement: 10,
          durability: 15
      })).toEqual({
          name:"something",
          enhancement: 10,
          durability: 100
      })

    })
})

describe('Unit test for success fuction',()=>{
    it('should take in an object',()=>{
        expect(()=>{enhancer.success("testing");
        }).toThrow();
        expect(()=>{enhancer.success(5);
        }).toThrow();
        expect(()=>{enhancer.success([]);
        }).toThrow();
        expect(()=>{enhancer.success(false);
        }).toThrow();
        expect(()=>{enhancer.success(null);
        }).toThrow();
        expect(()=>{enhancer.success(undefined);
        }).toThrow();
    });
    it('should add one to enhancement but leave durability unchanged',()=>{
        expect(enhancer.success({
            name:"something",
            enhancement: 10,
            durability: 15
        })).toEqual({
            name:"something",
            enhancement: 11,
            durability: 15
        })
    })
    it("Should not change enhancement if current enhancement level is already 20", ()=>{
        expect(enhancer.success({
            name:"something",
            enhancement: 20,
            durability: 10
        })).toEqual({
            name:"something",
            enhancement: 20,
            durability: 10
        })
    })

})

describe("Unit test of fail enhancer function",()=>{
    it('should take in an object',()=>{
        expect(()=>{enhancer.fail("testing");
        }).toThrow();
        expect(()=>{enhancer.fail(5);
        }).toThrow();
        expect(()=>{enhancer.fail([]);
        }).toThrow();
        expect(()=>{enhancer.fail(false);
        }).toThrow();
        expect(()=>{enhancer.fail(null);
        }).toThrow();
        expect(()=>{enhancer.fail(undefined);
        }).toThrow();
    });
    it('If enhancement is less than 15, the durability of item is decreased by 5', ()=>{
        expect(enhancer.fail({
            name:"something",
            enhancement: 12,
            durability: 10
        })).toEqual({
            name:"something",
            enhancement: 12,
            durability: 5
        })
    })
    it('If enhancement is 15 or more, the durability of item is decreased by 10', ()=>{
        expect(enhancer.fail({
            name:"something",
            enhancement: 15,
            durability: 50
        })).toEqual({
            name:"something",
            enhancement: 15,
            durability: 40
        })
    })
    it('If enhancement is 16 or more, the enhance,ent lvl decreases by 1', ()=>{
        expect(enhancer.fail({
            name:"something",
            enhancement: 16,
            durability: 50
        })).toEqual({
            name:"something",
            enhancement: 15,
            durability: 40
        })
    })
    it('If weapon durability below 6, destroy weapon, set stats to 0' +
        'ie --> [broken]Iron Sword', () =>{
        expect(enhancer.fail({
            name:"something",
            enhancement: 16,
            durability: 5
        })).toEqual({
            name:"[broken]something",
            enhancement: 0,
            durability: 0
        })
    })
})

describe('Unit test for get method', () =>{
    it('should take in an object',()=>{
        expect(()=>{enhancer.get("testing");
        }).toThrow();
        expect(()=>{enhancer.get(5);
        }).toThrow();
        expect(()=>{enhancer.get([]);
        }).toThrow();
        expect(()=>{enhancer.get(false);
        }).toThrow();
        expect(()=>{enhancer.get(null);
        }).toThrow();
        expect(()=>{enhancer.get(undefined);
        }).toThrow();
    });
    it('if enhancement level is 0 the name is not modified', ()=>{
        expect(enhancer.get({
            name:"something",
            enhancement: 0,
            durability: 50
        })).toEqual({
            name:"something",
            enhancement: 0,
            durability: 50
        })
    })
    it('if enhancement level > 0 the name should include enhancement level' +
        'preceded by a plus sign, between square brackets before the items name.' +
        'ie --> [+7]Iron Sword', ()=>{
        expect(enhancer.get({
            name:"something",
            enhancement: 16,
            durability: 50
        })).toEqual({
            name:"[+16]something",
            enhancement: 16,
            durability: 50
        })
    })
})