require 'rails_helper'

RSpec.describe 'Places API', type: :request do
  # initialize test data
  let!(:places) { create_list(:place, 10) }
  let(:place_id) { places.first.id }

  # Test suite for GET /places
  describe 'GET /places' do
    # make HTTP get request before each example
    before { get '/places' }

    it 'returns places' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(places.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /places/:id
  describe 'GET /places/:id' do
    before { get "/places/#{place_id}" }

    context 'when the record exists' do
      it 'returns the places' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(place_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:place_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Place/)
      end
    end
  end

  # Test suite for POST /places
  describe 'POST /places' do
    let(:valid_attributes) do
      {
        name: 'Hobbiton',
        description: 'Hobbiton was located in the center of the Shire'\
        ' in the far eastern part of the Westfarthing.'
      }
    end

    context 'when the request is valid' do
      before { post '/places', params: valid_attributes }

      it 'creates a Place' do
        expect(json['name']).to eq('Hobbiton')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/places', params: { description: 'place with no name'} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  # Test suite for PUT /places/:id
  describe 'PUT /places/:id' do
    let(:valid_attributes) { { name: 'Matamata' } }

    context 'when the record exists' do
      before { put "/places/#{place_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /places/:id
  describe 'DELETE /places/:id' do
    before { delete "/places/#{place_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
