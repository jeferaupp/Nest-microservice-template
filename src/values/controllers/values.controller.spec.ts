import { Test, TestingModule } from '@nestjs/testing';
import { ValuesController } from './values.controller';
import { ValuesService } from '../services/values.service';
import { Value } from '../entities/value.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ValuesController', () => {
  let controller: ValuesController;
  let service: ValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValuesController],
      providers: [
        ValuesService,
        {
          provide: getRepositoryToken(Value),
          useClass: Value
        }]
    }).compile();

    service = module.get<ValuesService>(ValuesService);
    controller = module.get<ValuesController>(ValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Shoud return an array of values', async () => {
      //Arrange
      const expected: Value[] = [
        { id: 1, name: "John Doe", relatedValues: null }
      ];
      const spy = jest.spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(expected));

      //Act
      let result = await controller.findAll();

      //Assert
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(expected);
      expect(result[0].name).toBe(expected[0].name);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Should return one value by id', async () => {
      //Arrange
      const id = 1;
      const expeted: Value = { id: 1, name: "John Doe", relatedValues: null };
      const spy = jest.spyOn(service, 'find')
        .mockImplementation(() => Promise.resolve(expeted));

      //Act
      let result = await controller.findOne(id);

      //Assert
      expect(result).toEqual(expeted);
      expect(result.name).toBe(expeted.name);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('Should create a value when a valid request is submited', async () => {
      //Arrange
      const newValue: Value = { name: 'Another John Doe', id: null, relatedValues: null };
      const expected = { ...newValue };
      expected.id = 1;

      const spy = jest.spyOn(service, 'create')
        .mockImplementation(
          () => Promise.resolve(expected)
        );

      //Act
      let result = await controller.create(newValue);

      //Assert
      expect(result).toBe(expected);
      expect(result.id).not.toBe(newValue.id);
      expect(result.name).toBe(expected.name);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Should update a value when a valid request is submited', async () => {
      //Arrange      
      const currentValue: Value = { id: 1, name: "John Doe", relatedValues: null };
      const payload: Value = { id: null, name: "Jonh Doe - UPDATED", relatedValues: null };
      const expected: Value = { id: currentValue.id, name: payload.name, relatedValues: null }

      const spy = jest.spyOn(service, 'update')
        .mockImplementation(
          () => Promise.resolve(expected)
        );

      //Act
      let result = await controller.update(currentValue.id, payload);

      //Assert
      expect(result).toBe(expected);
      expect(result.id).not.toBe(payload.id);
      expect(result.name).toBe(payload.name);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('Should delete a value when a valid request is submited', async () => {
      //Arrange
      const currentValue: Value = { id: 1, name: "John Doe", relatedValues: null };
      
      const spy = jest.spyOn(service, 'remove')
        .mockImplementation();

      //Act
      await controller.delete(currentValue.id);

      //Assert
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
