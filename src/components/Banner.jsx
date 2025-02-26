// Banner.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUsers, faDog, faHome } from '@fortawesome/free-solid-svg-icons';

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const StatsContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const StatNumber = styled.span`
  font-size: 2em;
  font-weight: bold;
`;

const StatLabel = styled.span`
  font-size: 0.8em;
  color: #777;
  text-align: center;
`;

const LearnMoreButton = styled.button`
  background-color: white;
  color: #E67E22;
  border: 1px solid #E67E22;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #E67E22;
    color: white;
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      <TextContainer>
        <h2>RoadPet Srilanka Vision is to provide a loving home for every stray pet by 2030.</h2>
        <p>website will serve as a compassionate digital platform dedicated to rescuing and rehoming lost or abandoned road pets. It will connect communities, animal lovers, and rescuers to provide these pets with safety, medical care, and loving homes.</p>
        <LearnMoreButton>LEARN MORE</LearnMoreButton>
      </TextContainer>

      <StatsContainer>
        <StatItem>
          <FontAwesomeIcon icon={faMapMarkerAlt} aria-label="years" size="2x" style={{ color: '#E67E22' }} />
          <StatNumber>1000+</StatNumber>
          <StatLabel>PETS RESCUED</StatLabel>
        </StatItem>
        <StatItem>
          <FontAwesomeIcon icon={faUsers} aria-label="children" size="2x" style={{ color: '#E67E22' }} />
          <StatNumber>500+</StatNumber>
          <StatLabel>PETS ADOPTED</StatLabel>
        </StatItem>
        <StatItem>
          <FontAwesomeIcon icon={faDog} aria-label="locations" size="2x" style={{ color: '#E67E22' }} />
          <StatNumber>200+</StatNumber>
          <StatLabel>VOLUNTEERS</StatLabel>
        </StatItem>
        <StatItem>
          <FontAwesomeIcon icon={faHome} aria-label="districts" size="2x" style={{ color: '#E67E22' }} />
          <StatNumber>2030</StatNumber>
          <StatLabel>HOME FOR EVERY PET</StatLabel>
        </StatItem>
      </StatsContainer>
    </BannerContainer>
  );
};

export default Banner;
